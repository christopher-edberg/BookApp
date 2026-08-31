using System.Security.Claims;
using BookApp.Data;
using BookApp.DTO;
using BookApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QuoteController : ControllerBase
    {
        private readonly AppDbContext _context;
        public QuoteController(AppDbContext context)
        {
            _context = context;
        }
        //All quotes belonging to user
        [HttpGet]
        public async Task<IActionResult> GetQuotes ()
        {
            var userIdC = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdC == null)
            {
                return Unauthorized();
            }
            var userId = int.Parse(userIdC.Value);
            var quotes = await _context.Quotes.Where(x => x.UserId == userId).ToListAsync();
            return Ok(quotes);
        }


        [HttpPost]
        public async Task<IActionResult> CreateQuote(CreateQuoteDto dto)
        {
            var userIdC = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdC == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdC.Value);
            var quoteCount = await _context.Quotes.CountAsync(q => q.UserId == userId);
            if (quoteCount >= 5) {
                return BadRequest("You are allowed a maximum of 5 quotes.");
            }

            var quote = new Quote
            {
                Text = dto.Text,
                Author = dto.Author,
                UserId = userId
            };
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuotes),new { id = quote.Id },quote);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuote(int id, UpdateQuoteDto dto)
        {
            var userIdC = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdC == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdC.Value);
            var quote = await _context.Quotes.FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);

            if (quote == null)
            {
                return NotFound();
            }

            quote.Text = dto.Text;
            quote.Author = dto.Author;

            await _context.SaveChangesAsync();

            return Ok(quote);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var userIdC = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdC == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdC.Value);
            var quote = await _context.Quotes.FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);

            if (quote == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuote(int id)
        {
            var userIdC = User.FindFirst(ClaimTypes.NameIdentifier);


            if (userIdC == null)
            {
                return Unauthorized();
            }
            var userId = int.Parse(userIdC.Value);

            var quote = await _context.Quotes.FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);
            if (quote == null) return NotFound();
            return Ok(quote);
        }
    }
}
