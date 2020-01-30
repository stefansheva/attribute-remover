import * as cheerio from 'cheerio';

export class AttributesRemover{
    private $:CheerioStatic;

    constructor(html:string) {
        this.$ = cheerio.load(html);
    }

    removeAttributes(attributes) {
        let body = this.$('body');
        return this.removeTagsFromBody(body, attributes);
    }

    private removeTagsFromBody(element, attributes){
        this.clearAttributesForTag(element, attributes);
        var children = this.$(element).children();
        var _this = this
        children.each(function(idx, elem) {
            _this.removeTagsFromBody(_this.$(elem),attributes);
        });
        return element.html()
    }

    private clearAttributesForTag(tag, attributes, ignoreTags = []){
        if (ignoreTags.indexOf(this.$(tag).get(0).tagName) === -1) { // check if it's valid element
            attributes.forEach((t)=>this.$(tag).removeAttr(t));
        }
    }
}