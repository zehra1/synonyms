using Microsoft.EntityFrameworkCore;
using synonyms.Model;
using synonyms.Model.Requests;
using synonymsAPI.Database;
using synonymsAPI.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace synonymsAPI.Repositories
{
    public class wordRepositorycs : IWord
    {
        private synonymsDbContext _context;
        public wordRepositorycs(synonymsDbContext context)
        {
            _context = context;
        }

        public List<word> GetSynonyms(string requestWord)
        {
            var sin = _context.wordConnections.Where(w => w.word2 == requestWord).ToList();
            List<word> words = new List<word>();
            foreach (var item in sin)
            {
                var obj = new word()
                {
                    Id = item.Id,
                    name = item.word1
                };
                words.Add(obj);
            }
            return words;
        }

        public List<string> Insert(wordUpsert request)
        {
            var wordList = request.words.ToList();
            if(wordList.Count() == 0 || wordList.Count() == 1)
            {
                return null;
            }
            var wordListCopy =new List<string>(wordList);
           List<string> existingSynonyms = new List<string>(wordList);
            foreach (var word in wordList)
            {
                var list = _context.wordConnections.Where(x => x.word1 == word).ToList();
                if (list.Count() > 0)
                {
                    foreach (var item in list)
                    {
                        existingSynonyms.Add(item.word2);
                    }
                }
            }
            List<string> distinct = existingSynonyms
              .GroupBy(p => p)
              .Select(g => g.First())
              .ToList();
            for (int i = 0; i < distinct.Count(); i++)
            {
                for (int j = 0; j < distinct.Count(); j++)
                {
                    if (distinct[i] != distinct[j] 
                        && _context.wordConnections.Where(x=> x.word1 == distinct[i] && x.word2 == distinct[j]).Count() == 0)
                    {
                        var newConn = new wordConnections()
                        {
                            word1 = distinct[i],
                            word2 = distinct[j]
                        };
                        _context.wordConnections.Add(newConn);
                    }
                }
            }
            _context.SaveChanges();
            return existingSynonyms;
        }
    }
}
