import { IonPage, IonContent, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, useIonRouter, IonButton, IonButtons, IonIcon, } from '@ionic/react';
import './index.css';
import React, { useEffect, useState } from 'react';
import HeaderView from '../../components/HeaderView';
import { getCandidate } from '../../provider/data'
import Navigation from '../../components/Navigation';
import { arrowBackOutline } from 'ionicons/icons';

const CandidateProfile: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [candidate, setCandidate] = useState<any>();
	const router = useIonRouter();

	const sourceUrl = (url: string) => {
		return "assets/imgs/candidate/" + url;
	}

	const getCandidateName = () => {
		return candidate.Prefix + " " + candidate.FirstName + " " + candidate.MiddleName + " " + candidate.SurName;
	}

	useEffect(() => {
		const paths = router.routeInfo.pathname.split('/');
		var id = paths[paths.length - 1];
		setCandidate(getCandidate(id));
	}, [])

	return (
		<IonPage id="content">
			<Navigation open={open} setOpen={setOpen}/>
			<HeaderView type="headerview" isGranularityEnabled={false} setOpen={setOpen}>
				<IonToolbar color="dark" className="ion-sub-navbar">
					<IonButtons slot="start">
						<IonButton className='ion-float-left' onClick={() => router.goBack()} style={{ zIndex: 200}}>
							<IonIcon icon={arrowBackOutline} slot="start"></IonIcon>
						</IonButton>
					</IonButtons>
					<IonTitle>
						Candidate Details
					</IonTitle>
				</IonToolbar>
			</HeaderView>

			<IonContent className="page-candidate-profile ion-padding no-scroll">
				{candidate && <div className="">
					<IonGrid className="show-core">
						<IonRow>
							<IonCol className="ion-col-4 ion-text-center">
								<img className="candidate-logo" src={sourceUrl(candidate.CandidatePhoto)} />
							</IonCol>
							<IonCol className="ion-col-8">
								<h4>{ getCandidateName() }</h4>
								<p><strong>Political Party:</strong> { candidate.PoliticalParty }</p>
								<p><strong>Election Year:</strong> { candidate.ElectionYear }</p>
								<p><strong>Body:</strong></p> <div dangerouslySetInnerHTML={{__html: candidate.Profile}}></div>
							</IonCol>
						</IonRow>
					</IonGrid>
					<IonGrid className="show-tablet">
						<IonRow>
							<IonCol className="ion-text-center">
								<img className="candidate-logo" src={sourceUrl(candidate.CandidatePhoto)} />
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<h4>{ getCandidateName() }</h4>
								<p><strong>Political Party:</strong> { candidate.PoliticalParty }</p>
								<p><strong>Election Year:</strong> { candidate.ElectionYear }</p>
								<p><strong>Body:</strong></p> <div dangerouslySetInnerHTML={{__html: candidate.Profile}}></div>
							</IonCol>
						</IonRow>
					</IonGrid>
					<IonGrid className="show-mobile">
						<IonRow>
							<IonCol className="ion-text-center">
								<img className="candidate-logo" src={sourceUrl(candidate.CandidatePhoto)} />
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<h4>{ getCandidateName() }</h4>
								<p><strong>Political Party:</strong> { candidate.PoliticalParty }</p>
								<p><strong>Election Year:</strong> { candidate.ElectionYear }</p>
								<p><strong>Body:</strong></p> <div dangerouslySetInnerHTML={{__html: candidate.Profile}}></div>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>}
				{!candidate && <div className="empty-info ion-padding-top">
					There is no information about this candidate.
				</div>}
			</IonContent>
		</IonPage>
	);
};

export default CandidateProfile;
