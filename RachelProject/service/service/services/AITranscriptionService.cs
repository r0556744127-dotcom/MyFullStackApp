using service.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.services
{
    public class AITranscriptionService : ITranscriptionService
    {
        // כאן אפשר להוסיף מפתח API אם צריך
        public async Task<string> TranscribeAsync(Uri recordingLink)
        {
            // שליחת ההקלטה ל‑AI (למשל Whisper)
            // החזרה לדוגמה
            return "תמלול אוטומטי של השיעור";
        }

        public async Task<string> SummarizeAsync(string transcript)
        {
            // סיכום הטקסט עם AI
            return "סיכום קצר של השיעור";
        }
    }
}
