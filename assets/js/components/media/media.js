import React, {Component} from 'react';
import axios from 'axios';
import styles from  './media.module.css';
import mainStyles from "../dash.module.css";
import logo from "../React-icon.svg";
import ImageComponent from "./ImageComponent";
import mediaStyle from "../nasaMedia/nasaMedia.module.css";
import NasaVideosComponent from "../nasaMedia/nasaVideosComponent";
import NasaImagesComponent from "../nasaMedia/nasaImagesComponent";
import previewComponent from "./previewComponent";
import PreviewComponent from "./previewComponent";

class Media extends Component{

    constructor(props) {
        super(props);

        this.state = {
            media: {
                collection: {
                    items: [],
                    links: [],
                    href: null,
                }
            },
            previewMedia: {
                divID: null,
                items: [],
                data: [],
                downloadLink: null

            },
            page: 1,
            year: 2022,
            loading: true
        };
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        document.addEventListener('scroll', this.trackScrolling);
        axios.get(`https://images-api.nasa.gov/search?year_start=2022&page=1`).then(response => {
            this.setState({media: response.data,loading: false});
        });

    }

    callAPI(){
        let year = this.state.year;
        let page = this.state.page;
        let url = `https://images-api.nasa.gov/search?year_start=`+year+`&page=`+page;
        console.log(url);
        axios.get(url).then(response => {
            this.setState({media: response.data,loading: false});
        });
    }

    download(link) {
        // fake server request, getting the file url as response
        setTimeout(() => {
            const response = {
                file: link,
            };
            // server sent the url to the file!
            // now, let's download:
            window.open(response.file);
            // you could also do:
            // window.location.href = response.file;
        }, 100);
    }

    back = () =>{
        const id = this.state.previewMedia.divID;
        const non = null;

        this.setState({
            previewMedia: {
                divID: non,
                items: []
            }});

    }

    setYear = (e) => {
        let x = e.target.value;
        this.setState({year:x,loading: true},this.callAPI);
    }

    prevPage = (e) =>{

        let page = this.state.page;
        page--;
        this.setState({page:page,loading: true},this.callAPI);

    }

    nextPage = (e) =>{

        let page = this.state.page;
        page++;
        this.setState({page:page,loading: true},this.callAPI);

    }

    getData = (e, arg, data) =>{
        let downloadLink = null
        axios.get(arg,{ headers: {  'Access-Control-Allow-Origin': '*' } }).then(response => {

            response.data.map(s=>{
                let media = s.split('/',8);
                let source = media[5].split('.');
                let type = media[5].split('~');

                if(media[3] === 'video' && source[1] === 'mp4' && type[1] === 'large.mp4'){
                    downloadLink = 'https://images-assets.nasa.gov/video/'+media[4]+'/'+media[5];
                }else if(media[3] === 'image' && type[1] === 'orig.jpg' || type[1] === 'large.jpg'){
                    downloadLink = 'https://images-assets.nasa.gov/image/'+media[4]+'/'+media[5];
                }
            })

            this.setState({
                previewMedia: {
                    items: response.data,
                    divID: e,
                    data: data,
                    downloadLink: downloadLink
                }});
        });



    }

    render() {
        if (this.state.media.collection.items.length !== 0){
            let preview = null;
            let page = this.state.page;

            if(this.state.previewMedia.items.length !== 0) {
                preview = this.state.previewMedia.items.map(imagedata => {
               //     console.log(imagedata.split('/',8));

                    let media = imagedata.split('/',8);
                    let source = media[5].split('.');
                    let type = media[5].split('~');
                    console.log(media[3]);
                    console.log(type[1]);

                    if(media[3] === 'video' && source[1] === 'mp4' && type[1] === 'large.mp4'){
                        return <NasaVideosComponent
                            key={media[4]}
                            source={media[4]+'/'+media[5]}
                            title={this.state.previewMedia.data.title}
                            date_created={this.state.previewMedia.data.date_created}
                            description={this.state.previewMedia.data.description}
                            center={this.state.previewMedia.data.center}
                        ></NasaVideosComponent>
                    }else if(media[3] === 'image' && type[1] === 'orig.jpg'){
                        return <ImageComponent
                            key={media[4]}
                            href={media[4]+'/'+media[5]}
                            title={this.state.previewMedia.data.title}
                            date_created={this.state.previewMedia.data.date_created}
                            description={this.state.previewMedia.data.description}
                            photographer={this.state.previewMedia.data.photographer}
                            center={this.state.previewMedia.data.center}
                            location={this.state.previewMedia.data.location}
                        ></ImageComponent>
                    }else{
                        console.log("new media type");
                        return null
                    }
                })
            }

            const thumbs = this.state.media.collection.items.map((data, index) => {
                if(!data){
                  return null;
                }else {
                    return (
                            <div key={index+1} ref={'image'+index+1} className={styles.nasaImageContainer} id={index+1}>
                                {data.links ?
                                    <a href={'#'} onClick={event => this.getData(index+1, data.href, data.data[0])}>
                                        <img className={styles.nasaImagePreview} src={data.links[0].href}/>
                                    </a>
                                    :
                                    <a href={'#'} onClick={event => this.getData(index+1, data.href, data.data[0])}>
                                        <img className={styles.nasaImagePreview} src={'/images/noImage.jpg'}/>
                                    </a>
                                }
                            </div>
                    );
                }

            });
        const thumbImage = thumbs.map(previewImages => {
            if(this.state.loading){
                return (<div className={mainStyles.loadingSection}>
                    <div className={mainStyles.loading}>
                        <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
                        <small className={mainStyles.textGlow}>Loading Component...</small>
                    </div>
                </div>);
            }else {
                return previewImages;
            }

        })

            return (

                <div className={mediaStyle.nasaMediaSection} id={'mediaSection'} onScroll={this.scrollCheck}>
                    <div className={mediaStyle.dashMain}>
                        <div className={mediaStyle.mainURIControls}>
                            <select id="year" className={styles.year} onChange={e => this.setYear(e)} defaultValue={'2020'}>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                            <div>
                                <button onClick={e => this.prevPage(e)}>Prev</button>
                                <a>Page{page}</a>
                                <button onClick={e => this.nextPage(e)}>Next</button>
                            </div>
                        </div>

                    </div>

                    {this.state.previewMedia.divID ?
                        <div className={mediaStyle.preview}>
                            <div className={styles.controls}>
                                <button onClick={() => this.back()}>Back</button>
                                <button onClick={() => this.download(this.state.previewMedia.downloadLink)}>Download</button>
                            </div>
                            {preview}
                        </div>
                        : thumbImage }



                </div>

            );


        }else{
            return (<div className={mainStyles.loadingSection}>
                <div className={mainStyles.loading}>
                    <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
                    <small className={mainStyles.textGlow}>Loading Component...</small>
                </div>
            </div>);
        }

    }

}

export default Media;
