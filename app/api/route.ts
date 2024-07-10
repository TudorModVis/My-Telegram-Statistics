interface Chats {
    name: string,
    messages: number,
  }

  interface Words {
    word: string,
    usage: number,
  }

  interface Years {
    year: Chats[]
  }

  const convertMonth = (month: string) => {
    switch(month) {
      case '01': return "Jan"
      case '02': return "Feb"
      case '03': return "Mar"
      case '04': return "Apr"
      case '05': return "May"
      case '06': return "June"
      case '07': return "July"
      case '08': return "Aug"
      case '09': return "Sept"
      case '10': return "Oct"
      case '11': return "Nov"
      case '12': return "Dec"
    }
    return ""
  }

const getData = (result: any) => {
    const chatsArr: Years[] = Array.from({ length: 5 }, () => ({ year: [] }));
    const hoursArr: Years[] = Array.from({ length: 5 }, () => ({ year: [] }));
    const timeline: any = {}
    let sentMessages = 0
    let totalWords = 0;
    const wordsUsed: any = {}

    const hours = Array.from({ length: 5 }, () => Array(24).fill(0));

    const userId = "user" + result.personal_information.user_id
    result.chats.list.forEach((contact: {name: string, messages: []}) => {
      // Chat messages counter
      let texts = new Array(5).fill(0);
      // sentMessages += contact.messages.length;

      contact.messages.forEach((message: any) => {
        if (message.from_id !== userId) return;

        sentMessages++;

        const year = message.date.split("T")[0].substr(0, 4);
        const month = message.date.split("T")[0].substr(5, 2);
        const hour = message.date.split("T")[1].substr(0, 2);

        // Calculate the total number of words used
        Object.hasOwn(timeline, `${year}-${month}`) ? timeline[`${year}-${month}`]++ : timeline[`${year}-${month}`] = 1;

        // Count the total number of words used
        if (message.text !== '' && typeof message.text === 'string') {
          const words = message.text.split(" ");
          words.forEach((word: string) => {
            if (word == ' ' || word.length === 0 || /^[a-zA-Z0-9]$/.test(word) || typeof word !== 'string') return;
            totalWords++;
            if (/^[^a-zA-Z0-9]/.test(word)) word = word.substring(1);
            if (/[^a-zA-Z0-9]$/.test(word)) word = word.substring(0, word.length - 1);
            Object.hasOwn(wordsUsed, word.toString().toLowerCase()) ? wordsUsed[word.toString().toLowerCase()]++ : wordsUsed[word.toString().toLowerCase()] = 1;
          });
        }

        // Count all messages
        texts[0]++;
        hours[0][Number(hour)]++;

        // Count messages for 2021
        if (year === '2021') {
          texts[1]++;
          hours[1][Number(hour)]++;
        }

        // Count messages for 2022
        if (year === '2022') {
          texts[2]++;
          hours[2][Number(hour)]++;
        }

        // Count messages for 2023
        if (year === '2023') {
          texts[3]++;
          hours[3][Number(hour)]++;
        }

        // Count messages for 2024
        if (year === '2024') {
          texts[4]++;
          hours[4][Number(hour)]++;
        }

      });

      // Pushing chat messages for a year
      for (let i = 0; i < 5; i++) {
        chatsArr[i].year.push({name: contact.name, messages: texts[i]})
      }
    });

     for (let i = 0; i < 5; i++) {
        // Pushing chats into final array
        chatsArr[i].year = chatsArr[i].year.sort((a, b) => b.messages - a.messages).slice(0, 10);

        // Pushing hours messages for a year
        for (let j = 0; j < 24; j++) {
            const hour = j === 0 ? "12 AM" : j < 13 ? j + " AM" : (j - 12) + " PM";
            hoursArr[i].year.push({ name: hour, messages: hours[i][j] });
        }
    }
   
    // Arranging timeline into chart format
    let orderedTimeline = Object.keys(timeline).sort().reduce(
      (obj: any, key: string) => {
        obj[key] = timeline[key];
        return obj
      },
      {}
    )

     // Sorting words used by count
     const sortedUsedWords = Object.entries(wordsUsed).sort((a: any, b: any) => b[1]-a[1]);

     // Determening top 10 words used 
     let topWords:Words[] = [];
     for (let i = 0; i < sortedUsedWords.length; i++) {
      if (sortedUsedWords[i][0].length < 4) continue;
      topWords.push({word: sortedUsedWords[i][0], usage: Number(sortedUsedWords[i][1])});
      if (topWords.length > 19) break; 
     }

    const finalTimeline: Chats[] = [];
    for (const [key, value] of Object.entries(orderedTimeline)) {

      const month = convertMonth(key.split("-")[1]);
      finalTimeline.push({name: `${month} '${key.split("-")[0].slice(2)}`, messages: Number(value)})
    }

    return {chats: chatsArr, hours: hoursArr, timeline: finalTimeline, sentMessages: sentMessages, totalWords: totalWords, usedWords: sortedUsedWords, topWords: topWords};
  }

  export async function POST(request: Request) {
    const body = await request.json();
    const base64String = body.dataURI.split(',')[1];
    const jsonString = Buffer.from(base64String, 'base64').toString('utf-8');
    return Response.json(getData(JSON.parse(jsonString)));
}