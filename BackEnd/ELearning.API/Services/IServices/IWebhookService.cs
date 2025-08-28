using Stripe;
using FluentResults;

namespace ELearning.API.Services.IServices
{
    public interface IWebhookService
    {
        Task<Result<string>> HandlePaymentIntentSucceededAsync(PaymentIntent paymentIntent);
        //Task<string> HandlePaymentIntentCreatedAsync(string json);
        Task<Result<string>> HandlePaymentIntentPaymentFailedAsync(PaymentIntent paymentIntent);
        Task<Result<string>> HandlePaymentIntentCanceledAsync(PaymentIntent paymentIntent);
    }
}
