import React, { useRef, useState } from 'react';
import { IonContent, IonButton, IonButtons, IonPage, IonTitle, IonToolbar, IonIcon, useIonViewDidEnter, useIonLoading } from '@ionic/react';
import './index.css';
import HeaderView from '../../components/HeaderView';
import { arrowForwardOutline, arrowBackOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper';
import { useSelector, useDispatch } from 'react-redux';
import { dataSelector, setYear, setWholeResults } from '../../slices/dataSlice';
import { useAvailability } from '../../hooks/useAvailability';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/pagination';
import ContentView from '../../components/ContentView';
import Navigation from '../../components/Navigation';
import president_2023 from './export-all-presidential-results.json'

const PageView: React.FC<{title: string, type: string}> = ({title, type}) => {
  const firstRef = useRef<any>();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState<{
    prevYear: number,
    nextYear: number,
    prevEnabled: boolean,
    nextEnabled: boolean,
  }>({
    prevYear: 0,
    nextYear: 0,
    prevEnabled: false,
    nextEnabled: false,
  });
  const dispatch = useDispatch();
  let subpages: Array<{year: Number}> = [
    { year: 1996},
    { year: 2002},
    { year: 2007},
    { year: 2012},
    { year: 2018},
    { year: 2023},
  ];
  let totalPages = subpages.length;
  let [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const selector = useSelector(dataSelector);
  const [present, dismiss] = useIonLoading();
  const year_ = selector.year;
  const [availability, setGranularity] = useAvailability(type, selector.year);
  const region = availability.region;

  const setPageInfo = () => {
    dispatch(setYear(subpages[totalPages - 1].year));

    if (totalPages > 1) {
      setState({
        ...state,
        prevEnabled: true,
        prevYear: Number(subpages[totalPages - 2].year),
      })
    }

    let initialSlide:any = totalPages > 1 ? totalPages - 1 : 0;
    if (swiperInstance) {
      swiperInstance.slideTo(initialSlide, 500);
    }
  }

  const setPrevPage = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperInstance.activeIndex - 1, 500);
    }
  }

  const setNextPage = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperInstance.activeIndex + 1, 500);
    }
  }

  const slideChanged = () => {
    if (swiperInstance) {
      let currentIndex = swiperInstance.activeIndex;
      if (!totalPages || currentIndex == totalPages || totalPages === 0) return;

      setState({
        ...state,
        prevEnabled: !swiperInstance.isBeginning && currentIndex > 0,
        nextEnabled: !swiperInstance.isEnd && currentIndex < (totalPages - 1),
        prevYear: Number(!swiperInstance.isBeginning && currentIndex > 0? subpages[currentIndex - 1].year : 0),
        nextYear: Number(!swiperInstance.isEnd && (currentIndex < totalPages-1)? subpages[currentIndex + 1].year : 0),
      })

      setSlideChanges(subpages[currentIndex].year);
    }
  }

  const setSlideChanges = (year: any) => {
    if (swiperInstance) {
      let currentIndex = swiperInstance.activeIndex;
      if (!totalPages || currentIndex == totalPages || totalPages === 0) return;
      dispatch(setYear(year));
    }
  }

  useIonViewDidEnter(() => {
    if (swiperInstance && firstRef.current && Object.keys(selector.whole_results).length === 0) {
      console.log('loading')
      present({
        message: 'Loading data...',
        duration: 1000
      });

      import('axios').then(async (Axios: any) => {
        const axios = Axios.default;
        // axios.get('http://localhost:5000/election_results').then((response: any) => {
        axios.get('https://app.electiondata.io/election_results').then((response: any) => {
          dispatch(setWholeResults({
            ...response.data,
            president_2023: president_2023
          }));
          dismiss();
        });
      })
    }
    setPageInfo(); 
  }, [swiperInstance]);

  return (
    <>
      <Navigation open={open} setOpen={setOpen}/>
      <IonPage id="content">
        <HeaderView setOpen={setOpen} type="president" availability={availability} setGranularity={setGranularity}>
          <IonToolbar color="dark" className='sub-nav'>
            {state.prevEnabled && 
              <IonButtons slot="start">
                <IonButton className='ion-float-left' onClick={setPrevPage} style={{ zIndex: 200}}>
                  <IonIcon icon={arrowBackOutline} slot="start"></IonIcon> {String(state.prevYear)}
                </IonButton>
              </IonButtons>}

            <IonTitle>
              { String(year_) } {title}
            </IonTitle>

            {state.nextEnabled && 
              <IonButtons slot="end">
                <IonButton className='ion-float-right' onClick={setNextPage} style={{ zIndex: 200}}>
                  <div>{String(state.nextYear)}</div> <IonIcon icon={arrowForwardOutline} slot="start"></IonIcon> 
                </IonButton>
              </IonButtons>}
          </IonToolbar>
        </HeaderView>
        <IonContent className='ion-padding'>
        <Swiper 
            onSwiper={(swiper) => setSwiperInstance(swiper)} 
            onSlideChange={slideChanged}  
            // modules={[Pagination]} 
            // pagination={{ clickable: true }}
            ref={firstRef}
          >
            {subpages.map((subpage, index) =>
              (<SwiperSlide key={'contentview_' + index}>
                {selector.whole_results.chairperson && region && 
                  <ContentView 
                    type={type} 
                    year={subpage.year} 
                    region={region} 
                    availability={availability} 
                    setGranularity={setGranularity}
                    setOpen={setOpen}
                  />}
              </SwiperSlide>)
            )}
          </Swiper>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PageView;
