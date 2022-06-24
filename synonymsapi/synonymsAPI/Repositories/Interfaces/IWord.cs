using synonyms.Model.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace synonymsAPI.Repositories.Interfaces
{
    public interface IWord
    {
       List<string> Insert(wordUpsert request);
       List<synonyms.Model.word> GetSynonyms(string requestWord);
    }
}
