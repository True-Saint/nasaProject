import React, {Component} from 'react';
import axios from 'axios';
import NasaImagesComponent from "./nasaImagesComponent";
import mainStyles from "../dash.module.css";
import logo from "../React-icon.svg";
import mediaStyle from './nasaMedia.module.css';
import NasaVideosComponent from './nasaVideosComponent';
import styles from  './nasaMedia.module.css';
import ReactDOM from 'react-dom';

class NasaMedia extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                media: {
                    collection: {
                        items: [],
                        links: [],
                        href: null,

                    },
                    metadata: {
                        total_hits: null
                    }
                },
                previewMedia: {
                    divID: null,
                    items: [],
                    data: [],
                    downloadLink: null

                },
                page: 1,
                year: 2020,
                loading: true
            };

    }

    isBottom(el) {
        let rect = el.getBoundingClientRect();
        console.log(rect.bottom + '-' + rect.y + '-' + rect.height)
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }


    trackScrolling = () => {
        const wrappedElement = document.getElementById('mediaSection');
        console.log('header bottom not reached');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        document.addEventListener('scroll', this.trackScrolling);
        axios.get(`https://images-api.nasa.gov/search?year_start=2020&page=1`).then(response => {
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

    componentWillUnmount() {
        this.axiosCancelSource.cancel('Axios request canceled.');
        document.removeEventListener('scroll', this.trackScrolling);
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
                    }else if(media[3] === 'image' && type[1] === 'large.jpg'){
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
    scrollCheck = event => {
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        if (bottom) {
            console.log("At The Bottom"); //Add in what you want here
        }
    };
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

    render() {
        if (this.state.media.collection.items.length !== 0) {
            let preview = null;
            let page = this.state.page;

            if(this.state.previewMedia.items.length !== 0){
                preview = this.state.previewMedia.items.map( s => {

                    let media = s.split('/',8);
                    let source = media[5].split('.');
                    let type = media[5].split('~');

                    if(media[3] === 'video' && source[1] === 'mp4' && type[1] === 'large.mp4'){
                        return <NasaVideosComponent
                            key={media[4]}
                            source={media[4]+'/'+media[5]}
                            title={this.state.previewMedia.data.title}
                            date_created={this.state.previewMedia.data.date_created}
                            description={this.state.previewMedia.data.description}
                            center={this.state.previewMedia.data.center}
                        ></NasaVideosComponent>
                    }else if(media[3] === 'image' && type[1] === 'large.jpg'){
                        return <NasaImagesComponent
                            key={media[4]}
                            href={media[4]+'/'+media[5]}
                            title={this.state.previewMedia.data.title}
                            date_created={this.state.previewMedia.data.date_created}
                            description={this.state.previewMedia.data.description}
                            photographer={this.state.previewMedia.data.photographer}
                            center={this.state.previewMedia.data.center}
                            location={this.state.previewMedia.data.location}
                        ></NasaImagesComponent>
                    }else{
                        return null
                    }

                })

            }

            const xa = this.state.media.collection.items.map((x, index) => {
                if (!x) {
                    return null;
                } else {
                        return (
                            <div key={index} ref={'image'+index} className={styles.nasaImageContainer} id={index}>

                                {console.log(x)}
                                {x.links ?
                                    <a href={'#'} onClick={event => this.getData(index, x.href, x.data[0])}><img
                                        className={styles.nasaImagePreview} src={x.links[0].href}/></a>
                                    :
                                    <a href={'#'} onClick={event => this.getData(index, x.href, x.data[0])}><img
                                        className={styles.nasaImagePreview} src={'/images/noImage.jpg'}/></a>
                                }
                            </div>);
                }
            })
          const a = xa.map(component => {
              if(this.state.loading){
                  return (<div className={mainStyles.loadingSection}>
                      <div className={mainStyles.loading}>
                          <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
                          <small className={mainStyles.textGlow}>Loading Component...</small>
                      </div>
                  </div>);
              }else {
                  return component;
              }
            })
            return (

                <div className={mediaStyle.nasaMediaSection} id={'mediaSection'} onScroll={this.scrollCheck}>
                        <div className={mediaStyle.dashMain}>
                            <div className={mediaStyle.mainURIControls}>
                            <select id="year" onChange={e => this.setYear(e)} defaultValue={'2020'}>
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
                    : a }



                    </div>

            );
        } else {
            return (<div className={mainStyles.loadingSection}>
                <div className={mainStyles.loading}>
                    <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
                    <small className={mainStyles.textGlow}>Loading Component...</small>
                </div>
            </div>);
        }
    }
}

export default NasaMedia;
