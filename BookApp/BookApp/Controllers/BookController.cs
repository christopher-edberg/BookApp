using BookApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApp.DTO;
using BookApp.Data;
namespace BookApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class BookController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookController(AppDbContext context)
        {
            _context = context;
        }
        //All books //inte skyddad, kan göras utan att logga in för att visa alla böcker
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBook(CreateBookDTO dto)
        {
            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                PublicationDate = dto.PublicationDate,

            };
            _context.Books.Add(book);

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book );
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, UpdateBookDTO book)
        {
            var existingBook = await _context.Books.FindAsync(id);

            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.PublicationDate = book.PublicationDate;

            await _context.SaveChangesAsync();

            return Ok(existingBook);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {

            var book = await _context.Books.FindAsync(id);


            if(book == null)
            {
                return NotFound();
            }

            var dto = new BookDTO
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                PublicationDate = book.PublicationDate
            };

            return Ok(dto);
        }

    }
}
