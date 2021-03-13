export default {
    messages: new Array(),
    size(): number {
        return this.messages.length;
    },
    msg(text: string, limit: number = 5): void {
        this.messages.push(text);
        if (this.messages.length > limit) {
            this.messages = this.messages.slice(1);
        }
    },
    get(index: number): string {
        return this.messages[index];
    },
    all(): string[] {
        return this.messages;
    },
    load(messages: string[], limit: number = 5) {
        if (messages.length > limit) {
            this.messages = messages.slice(-limit);
        }
        else{
            this.messages = messages;
        }
    }
}