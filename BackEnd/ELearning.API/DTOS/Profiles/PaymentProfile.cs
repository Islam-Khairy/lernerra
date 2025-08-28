using AutoMapper;
using ELearning.API.DTOS.PaymentDtos;
using ELearning.API.Entites;
namespace ELearning.API.DTOS.Profiles
{
    public class PaymentProfile : Profile
    {

        public PaymentProfile()
        {
            CreateMap<PaymentDataDto, Payment>()
                .ForMember(dest => dest.Student_Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.Course_Id, opt => opt.MapFrom(src => src.CoursesId))
                .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
                .ForMember(dest => dest.Currency, opt => opt.MapFrom(src => src.Currency))
                .ForMember(dest => dest.PaymentIntentId, opt => opt.MapFrom(src => src.PaymentIntentId))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));
        }
    }
}
