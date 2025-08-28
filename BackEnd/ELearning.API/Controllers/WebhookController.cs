using ELearning.API.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebhookController : ControllerBase
    {
        private readonly IWebhookService _webhookService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<WebhookController> _logger;
        public WebhookController(IWebhookService webhookService,IConfiguration configuration, ILogger<WebhookController> logger)
        {
            _webhookService = webhookService;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("stripe")]
        public async Task<IActionResult> CheckStatus()
        {

            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeSignature = Request.Headers["Stripe-Signature"];


            //var webhookSecret = _configuration["Stripe:WebhookSecret"];
            try
            {
                Event stripeEvent = EventUtility.ParseEvent(json);
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;

                if (stripeEvent.Type == EventTypes.PaymentIntentSucceeded)
                {

                    await _webhookService.HandlePaymentIntentSucceededAsync(paymentIntent);
                   
                    //return Ok(result.Successes);
                }
               
                else if (stripeEvent.Type == EventTypes.PaymentIntentPaymentFailed)
                {
                    await _webhookService.HandlePaymentIntentPaymentFailedAsync(paymentIntent);

                    //return Ok(result.Errors.First().Reasons);

                }
                return Ok();


            }
            catch (StripeException e)
            {
                return BadRequest($"Webhook Server error: {e.Message}");

            }

        }
    }
}
