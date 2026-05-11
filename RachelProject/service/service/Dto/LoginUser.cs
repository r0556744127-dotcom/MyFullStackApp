using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace service.Dto
{
    public class LoginUser
    {
        [JsonPropertyName("identityNumber")] // הגשר לשדה מספר הזהות
        public string identityNumber { get; set; }
        [JsonPropertyName("password")] // הגשר לשדה הסיסמה
        public string password { get; set; }
    }
}
