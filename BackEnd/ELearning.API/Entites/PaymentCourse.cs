﻿namespace ELearning.API.Entites
{
    public class PaymentCourse
    {
        public int PaymentId { get; set; }
        public Payment? Payment { get; set; } = null!;

        public int CourseId { get; set; }
        public Course? Course { get; set; } = null!;
        
    }
}
