import { 
  IonContent,
  IonHeader,
  useIonRouter,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonList,
  IonModal
} from '@ionic/react';
import './index.css';

const Navigation = ({...props}: {open: any, setOpen: any}) => {
	const router = useIonRouter();
	const pages = [
		{ title: 'SLOEDP Platform', name: "", component: "" },
		{ title: 'Presidential', name: "president", component: '' },
		{ title: 'Parliamentary', name: "parliamentary", component: '' },
		{ title: 'Mayor', name: "mayor", component: '' },
		{ title: 'Chairperson', name: "chairperson", component: '' },
		{ title: 'Councilor', name: "councilor", component: '' },
		{ title: 'About this app', name: "about", component: '' },
		// { title: 'VillageHeadman', component: VillageHeadmanPage }
	];

	const moveTo = (url: any) => {
		router.push(url, "forward", "push");
		// props.setOpen(false);
	}

	return (<IonModal isOpen={ props.open } className='menu-modal'>
		<div className='navigation menu-inner'>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Election Type</IonTitle>
					<IonMenuButton auto-hide="false" slot="end" onClick={() => props.setOpen(false)}>
					</IonMenuButton>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonList>
					{pages.map((page: any) => (
						<IonItem onClick={() => moveTo("/" + page.name)} key={page.name} >
							<IonLabel>{page.title}</IonLabel>
						</IonItem>
					))}
				</IonList>
			</IonContent>
		</div>
	</IonModal>)
};

export default Navigation;
