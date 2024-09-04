export class PostDTO {
    create(postData) {
        return {
            content: postData.content
        }
    }
}