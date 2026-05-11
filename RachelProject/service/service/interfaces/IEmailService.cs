using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface IEmailService
    {
        Task SendMailToUsersAsync(List<string> emails, string subject, string body, List<string>? attachments = null);
    }
}
