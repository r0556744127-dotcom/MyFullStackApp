using service.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.services
{
    //public class TranscriptionService : ITranscriptionService
    //{
    //    // מתודה שמדמה תמלול של קובץ אודיו
    //    private readonly OpenAIAPI _api;

    //    public TranscriptionService(string apiKey)
    //    {
    //        _api = new OpenAIAPI(apiKey);
    //    }

    //    public async Task<string> TranscribeAsync(Uri audioUri)
    //    {
    //        using var stream = File.OpenRead(audioUri.LocalPath);
    //        var result = await _api.Audio.TranscribeAsync(stream, "whisper-1");
    //        return result;
    //    }

    //    public async Task<string> SummarizeAsync(string text)
    //    {
    //        // סיכום בסיסי
    //        return text.Length <= 200 ? text : text.Substring(0, 200) + "...";
    //    }
    //}
}
