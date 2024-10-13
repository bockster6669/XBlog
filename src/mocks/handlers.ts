import {http} from 'msw'

export const handlers = [
    http.get('', (req, res, ctx) => {
        return res({
            
        })
    })
]