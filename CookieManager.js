class CookieManager
{
    /**
     * 
     * @param {String} cookieName 
     */
    constructor(cookieName)
    {
        this.CookieName = cookieName;
    }

    getCookie()
    {
        var cookieName = this.CookieName;
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0) == ' ')
            {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0)
            {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    resetCookie()
    {
        var cookieName = this.CookieName;
        document.cookie = cookieName +
            "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }

    /**
     * 
     * @param {String} cookieValue 
     * @param {String} domainName 
     * @param {number} expirationDate 
     */
    setCookie(cookieValue, domainName, expirationDate)
    {
        var cookieName = this.CookieName;
        if (domainName == null)
        {
            var domainName = window.location.hostname;
        }
        var date = new Date();
        if (expirationDate == null)
        {
            expirationDate = Infinity;
        }
        date.setTime(expirationDate);
        document.cookie = cookieName + "=" + cookieValue + ";expires=" +
            date.toUTCString() + ";domain=" + domainName + ";path=/";
    }
}