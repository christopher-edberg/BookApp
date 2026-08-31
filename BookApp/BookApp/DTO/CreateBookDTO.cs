using System;

namespace BookApp.DTO
{
    public class CreateBookDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateTime PublicationDate { get; set; }
    }
}
