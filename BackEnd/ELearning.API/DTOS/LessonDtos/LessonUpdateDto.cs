namespace ELearning.API.DTOS.LessonDtos
{
    public class LessonUpdateDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string VedioURL { get; set; }

        public int Duration { get; set; }

        public bool? IsFree { get; set; }

    }
}
