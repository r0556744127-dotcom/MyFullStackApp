using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.interfaces
{
    public interface ITranscriptionService
    {
        Task<string> TranscribeAsync(Uri recordingLink);
        Task<string> SummarizeAsync(string transcript);
    }
}
