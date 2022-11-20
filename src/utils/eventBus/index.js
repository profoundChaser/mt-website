let instance = null
class EventBus{
    eventList = new Map()
    constructor(){
        if(!instance){
           instance = this
        }else {
            return instance
        }
    }
    emit = function(key,...args){
        this.eventList.set(key,args)
    }
    on = function(key,callback){
        if(!this.eventList.get(key)) throw Error('event no exist')
        const args = this.eventList.get(key)
        callback(...args)
    }
    off = function(key){
        this.eventList.delete(key)
    }
    clear = function(){
        this.eventList.clear()
    }
}

const eventBus = new EventBus()

export {
    eventBus
}