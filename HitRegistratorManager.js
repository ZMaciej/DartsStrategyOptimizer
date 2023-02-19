class HitRegistratorManager
{
    constructor(hitRegistrator)
    {
        this.CookieManager = new CookieManager("HitRegistrator");
        this.HitRegistrator = hitRegistrator;
    }

    save()
    {
        this.CookieManager.setCookie(this._arrayToJson());
    }

    load()
    {
        var json = this.CookieManager.getCookie();
        this._loadFromJson(json);
    }

    _arrayToJson()
    {
        return JSON.stringify(this.HitRegistrator.HitArray);
    }

    _loadFromJson(json)
    {
        var array = json;
        var hitArray = Array();
        array.forEach(element =>
        {
            var hit = new Hit(element.x, element.y, element.points);
            hitArray.push(hit);
        });
        this.HitRegistrator.addAll(hitArray);
    }
}