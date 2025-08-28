﻿namespace ELearning.API.Services.ChatBot.Services
{
    public class EmbeddingHelper
    {
        public static byte[] ConvertEmbeddingToBytes(List<float> embedding)
        {
            var byteArray = new byte[embedding.Count * sizeof(float)];
            Buffer.BlockCopy(embedding.ToArray(), 0, byteArray, 0, byteArray.Length);
            return byteArray;
        }

        public static List<float> ConvertBytesToEmbedding(byte[] bytes)
        {
            float[] floats = new float[bytes.Length / sizeof(float)];
            Buffer.BlockCopy(bytes, 0, floats, 0, bytes.Length);
            return floats.ToList();
        }
    }
}