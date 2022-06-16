import words from '/src/assets/data/words4.json';
import { writeFile } from 'fs/promises';

export async function put({ params, request }: any) {
    const data = await request.json();

    for (let i = 0; i < words.length; i++) {
        if (parseInt(params.id) === words[i].id) {
            words[i].tracker.seen ++;
            data.correct ? words[i].tracker.correct++ : words[i].tracker.incorrect++;
            words[i].tracker.lastSeen = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
            writeFile('src/assets/data/words4.json', JSON.stringify(words));
            return {
                body: { data },
            };
        }
    }


    return {
        status: 404,
    };


}