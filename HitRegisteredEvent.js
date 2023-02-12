class HitRegisteredEvent
{
    constructor()
    {
        this.callbacks = []
    }

    addCallback(cb)
    {
        this.callbacks.push(cb)
    }

    trigger(...args)
    {
        this.callbacks.forEach(cb => cb(...args))
    }
}