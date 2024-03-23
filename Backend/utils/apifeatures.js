class ApiFeatures {
    constructor(query, value={}) {
        this.query = query;
        this.value = value;
    }

    
    search(){
        const keyword= this .value.keyword
        ?{
            name:{
                $regex: this.value.keyword,
                $options: 'i'
            }
        }
        :{};

    this.query = this.query.find({...keyword});
    return this;
    }
    filter(){
        const queryCopy={...this.value};

        const removeFields=["keyword","page","limit","sort"]
        removeFields.forEach(field=>{
            delete queryCopy[field]
        })
        this.query=this.query.find(queryCopy);
        return this;
    }
    sort(){
        if(this.value.sort){
            if(this.value.sort === 'asc'){
                this.query=this.query.sort({price:1})
            }else if(this.value.sort === 'desc'){
                this.query=this.query.sort({price:-1})
            }
        }
        return this;
    }
    pagination(resultPerPage){
        const currentPage = Number(this.value.page) || 1;
        const skip =resultPerPage *(currentPage - 1);
        this.query =this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;

