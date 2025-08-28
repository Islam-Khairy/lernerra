namespace ELearning.API.Exceptions
{
    public class ForbiddenException:AppException
    {
        public ForbiddenException(string message="Forbidden")
            : base(403, message) { }

    }
}
