import words from '/src/assets/data/words4.json';
import { writeFile } from 'fs/promises';

export async function put({ params, request }) {
    const data = await request.json();

    for (let i = 0; i < words.length; i++) {
        console.log(words[i].id, params.id);
        if (parseInt(params.id) === words[i].id) {
            words[i] = data;
            writeFile('src/assets/data/words4.json', JSON.stringify(words))
            return {
                body: { data },
            };
        }
    }


    return {
        status: 404,
    };


}