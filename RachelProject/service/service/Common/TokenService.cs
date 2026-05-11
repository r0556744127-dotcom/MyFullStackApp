using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repositories.models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace service.Common
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }
        public string CreateToken(Student student)
        {
            // 1. הגדרת המידע שיישמר בתוך הטוקן (Claims)
            var claims = new List<System.Security.Claims.Claim>
            {
                  new System.Security.Claims.Claim(JwtRegisteredClaimNames.NameId, student.Id.ToString()),//ה-ID של הסטודנט
                  new System.Security.Claims.Claim(JwtRegisteredClaimNames.UniqueName, student.FullName),//שם הסטודנט
                  new System.Security.Claims.Claim("mustChangePassword", student.MustChangePassword.ToString().ToLower())//שדה מותאם אישית שבודק אם הוא חייב להחליף סיסמה.
            };

            // 2. יצירת מפתח הצפנה (חייב להיות לפחות 64 תווים ב-appsettings.json)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // 3. הגדרת מבנה הטוקן
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // תוקף ל-7 ימים
                SigningCredentials = creds
            };

            // 4. יצירת הטוקן בפועל
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
