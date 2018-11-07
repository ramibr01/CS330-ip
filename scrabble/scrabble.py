from flask import Flask, request, render_template, url_for, redirect, make_response

app = Flask(__name__)

score = {"a": 1, "c": 3, "b": 3, "e": 1, "d": 2, "g": 2, 
         "f": 4, "i": 1, "h": 4, "k": 5, "j": 8, "m": 3, 
         "l": 1, "o": 1, "n": 1, "q": 10, "p": 3, "s": 1, 
         "r": 1, "u": 1, "t": 1, "w": 4, "v": 4, "y": 4, 
         "x": 8, "z": 10}

def scrabble_score(word):
    total=0
    for each in word.lower():
        total=score[each]+ total
    return total   

@app.route("/", methods=['GET','POST'])
def index():
    if request.method == "GET":
        inputLetters = []
        letters = request.args
        for i in letters:
            if str(letters[i]) != "Submit" and str(letters[i]) != "" and str(letters[i]) != "american" and str(letters[i]) != "british" and str(letters[i]) != "on" and str(letters[i]) != str(letters["existing"]):
                inputLetters.append(str(letters[i]))
        
        if str(letters["existing"] in letters):
            for l in list(str(letters['existing'])):
                inputLetters.append(l)
                
        wordlist = []
        if str(letters['dict']) == "american":
            wordlist=list(line.strip('\n') for line in open('/usr/share/dict/american-english','r'))
            # wordlist=list(line.strip('\n') for line in open('american-english.txt','r'))
        else:
            wordlist=list(line.strip('\n') for line in open('/usr/share/dict/british-english','r'))
            # wordlist=list(line.strip('\n') for line in open('british-english.txt','r'))

        words=[]
        for word in wordlist:
            candidate=True
            letterlist = list(inputLetters)
            for letter in word:
                if letter not in letterlist:
                    candidate=False
                    break
                else:
                    letterlist.remove(letter)
            if candidate==True:
                words.append(word)
                for i in inputLetters:
                    if i in words:
                        words.remove(i)

        wordslength = []
        scores = []

        if len(words) == 0:
            words.append("Nothing found")
            wordslength.append("No length available")
            scores.append("No value available")
            print(words)
            data = zip(words, wordslength, scores)
            return render_template("scrabble_page.html", data=data)
        
        for word in words:
            wordslength.append(len(word))
            scores.append(scrabble_score(word))

        newDict = {}
        newl = sorted(words, key=len)
        for i in newl:
            newDict[i] = scrabble_score(i)

        sortedwords = []
        sortedscores = []
        for w in sorted(newDict, key=newDict.get, reverse=False):
            sortedwords.append(w)
            sortedscores.append(newDict[w])
        
        sortedlengths = sorted(wordslength, key=int, reverse=False)
        print(sortedlengths)

        data = zip(sortedwords, sortedlengths, sortedscores)    

        return render_template("scrabble_page.html", data=data)

if __name__ == '__main__':
    app.run()
