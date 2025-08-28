using ELearning.API.DTOS.InstructorApplicationDtos;
using FluentResults;

namespace ELearning.API.Services.IServices
{
    public interface IInstructorApplicationService
    {
        Task<Result<InstructorApplicationResponseDto>> CreateAsync(InstructorApplicationRequestDto instructorApplicationRequestDto);
        Task<IEnumerable<InstructorApplicationResponseDto>> GetAllApplicationsAsync();
        Task<InstructorApplicationResponseDto> GetApplicationByIdAsync(int id);
        Task DeleteApplicationAsync(int id);
        Task<ReviewResponseDto> ApproveOrRejectApplicationAsync(ReviewDto dto);

        Task<string> UplodadCv(IFormFile cv);

    }
}
