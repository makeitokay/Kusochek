using Domain.Entities;
using Infrastructure;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Kusochek.Controllers.Dto.Stories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kusochek.Controllers;

[Route("stories")]
public class StoriesController : ControllerBase
{
	private readonly IRepository<Story> _storyRepository;
	private readonly IUserRepository _userRepository;
	private readonly IStaticFileManager _staticFileManager;

	public StoriesController(
		IRepository<Story> storyRepository, IUserRepository userRepository, IStaticFileManager staticFileManager)
	{
		_storyRepository = storyRepository;
		_userRepository = userRepository;
		_staticFileManager = staticFileManager;
	}

	[HttpGet]
	public async Task<IActionResult> GetActualStoriesAsync()
	{
		var stories = await _storyRepository
			.Items
			.Where(s => s.ExpirationDateTimeUtc > DateTimeOffset.UtcNow)
			.Where(s => s.Status == StoryStatus.Ready)
			.OrderByDescending(s => s.CreationDateTimeUtc)
			.ToListAsync();

		return Ok(stories.Select(s => s.MapToStoryDto()));
	}
	
	[HttpGet("all")]
	[Authorize]
	public async Task<IActionResult> GetAllStoriesAsync()
	{
		var stories = await _storyRepository
			.Items
			.Where(s => s.ExpirationDateTimeUtc > DateTimeOffset.UtcNow)
			.OrderByDescending(s => s.CreationDateTimeUtc)
			.ToListAsync();

		return Ok(stories.Select(s => s.MapToStoryDto()));
	}

	[HttpPost]
	[Authorize]
	public async Task<IActionResult> CreateStoryAsync([FromForm] CreateStoryDto dto)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();
		
		await using var fileStream = dto.Preview.OpenReadStream();
		var fileUrl = await _staticFileManager.UploadFileAsync(fileStream, dto.Preview.FileName);

		var story = new Story
		{
			ExpirationDateTimeUtc = dto.ExpirationDate,
			PreviewImage = new MediaFile { FileUrl = fileUrl, Type = MediaFileType.Image },
			Title = dto.Title,
			Status = StoryStatus.Draft,
			CreationDateTimeUtc = DateTimeOffset.UtcNow
		};

		await _storyRepository.CreateAsync(story);

		return Ok(story.Id);
	}
	
	[HttpPost("{storyId:int}")]
	[Authorize]
	public async Task<IActionResult> AddFileToStoryAsync(int storyId)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();
		
		if (!Request.Form.Files.Any())
			return BadRequest();

		var story = await _storyRepository.GetAsync(storyId);
		
		var file = Request.Form.Files[0];
		
		await using var fileStream = file.OpenReadStream();
		var fileUrl = await _staticFileManager.UploadFileAsync(fileStream, file.FileName);
		
		story.Content.Add(new StoryMediaFile
		{
			MediaFile = new MediaFile
			{
				FileUrl = fileUrl
			}
		});

		await _storyRepository.UpdateAsync(story);

		return Ok();
	}
	
	[HttpPost("{storyId:int}/ready")]
	[Authorize]
	public async Task<IActionResult> MarkStoryAsReadyAsync(int storyId)
	{
		var userId = User.Claims.GetUserId();
		var user = await _userRepository.GetAsync(userId);

		if (!user.IsAdmin)
			return Forbid();
		
		var story = await _storyRepository.GetAsync(storyId);
		story.Status = StoryStatus.Ready;
		
		await _storyRepository.UpdateAsync(story);

		return Ok();
	}
}