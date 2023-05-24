import React from 'react';
import {
  IonList, 
  IonListHeader, 
  IonModal,
  IonItem,
} from '@ionic/react';

interface ContainerProps { availability:any, seletGranularity: any, isOpen: any, onDidDismiss: any }

const RangeViewComponent: React.FC<ContainerProps> = ({ isOpen, onDidDismiss, availability, seletGranularity}) => {
  return (
    <IonModal isOpen={isOpen} >
      <div className='range-view'>
        {availability && availability.region && <IonList>
          <IonListHeader>Result Granularity</IonListHeader>
          {availability.nationAvailable && <IonItem onClick={() => {seletGranularity('nation'); onDidDismiss();}}>National Results</IonItem>}
          {availability.regionAvailable && <IonItem onClick={() => {seletGranularity('region'); onDidDismiss();}}>Results By Region</IonItem>}
          {availability.districtAvailable && <IonItem onClick={() => {seletGranularity('district'); onDidDismiss();}}>Results By District</IonItem>}
          {availability.constituencyAvailable && <IonItem onClick={() => {seletGranularity('constituency'); onDidDismiss();}}>Results By Constituency</IonItem>}
          {availability.wardAvailable && <IonItem onClick={() => {seletGranularity('ward'); onDidDismiss();}}>Results By Ward</IonItem>}
          {availability.pollingCentreAvailable && <IonItem onClick={() => {seletGranularity('polling_centre'); onDidDismiss();}}>Results By Polling Centre</IonItem>}
        </IonList>}
      </div>
    </IonModal>
  );
};

export default RangeViewComponent;
