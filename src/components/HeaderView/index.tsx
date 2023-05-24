import { IonItem, IonLabel, IonHeader, IonSegment, IonTitle, IonButtons, IonMenuButton, IonToolbar, IonButton } from '@ionic/react';
import './index.css';
import React, { useState, useEffect } from 'react';
import RangeViewComponent from '../RangeView';
import { menuController } from '@ionic/core';

const HeaderView: React.FC<{ type: String, children: any, isGranularityEnabled?: boolean, setGranularity?: any, availability?:any, setOpen?:any }> 
	= ({ type, children, isGranularityEnabled = true, setGranularity, availability, setOpen }) => {
  let [selectdRange, setSelectedRange] = useState(false);

	const seletGranularity = (granularity: any) => {
    setGranularity(granularity);
		setSelectedRange(false);
  }

	const pages: any = [
		{ title: 'SLOEDP Platform', name: "", component: "" },
		{ title: 'Presidential', name: "president", component: "" },
		{ title: 'Parliamentary', name: "parliamentary", component: "" },
		{ title: 'Mayor', name: "mayor", component: "" },
		{ title: 'Chairperson', name: "chairperson", component: "" },
		{ title: 'Councilor', name: "councilor", component: "" },
		{ title: 'About this app', name: "about", component: "" },
	];

	const selectRange = (event: any) => {
		setSelectedRange(!selectdRange);
	}

  useEffect(() => {
    async function loading() {
		setTimeout(async () => {
			await menuController.enable(true, 'menu')
			const menu = await menuController.get('menu');
			console.log(await menuController.isEnabled())
			// if (menu.length === 0) {
			// 	window.location.reload();
			// }
			await menuController.open('menu')
		}, 50)
	}
	loading();
  }, [])

  return (
		<IonHeader className='header-view'>
			<IonToolbar color="dark" className="show-mobile">
				<IonButtons slot="start" style={{zIndex: 100}}>
					<IonMenuButton auto-hide="false" menu="menu" onClick={() => setOpen(true)}>
					</IonMenuButton>
					Menu
				</IonButtons>
				<IonTitle className='ion-text-uppercase ion-text-center'>sloedp</IonTitle>
				{isGranularityEnabled && (<IonButtons slot="end">
					<IonButton className="bar-button-menutoggle-md" onClick={selectRange}>
						Filter &nbsp;<i className="fa fa-ellipsis-h"></i>
					</IonButton>
				</IonButtons>)}
			</IonToolbar>
			<IonToolbar color="dark" className="show-core">
				<div className="toolbar-inner">
					<IonButton href="/" slot="end" className="ion-float-left bar-button-menutoggle-md bar-button-default-md disable-hover logo-icon">
						<img src="assets/imgs/logo.png" width="35" alt=""/> &nbsp;SLOEDP
					</IonButton>
					<IonTitle className='ion-text-uppercase ion-text-center'>
						<div className='inner'>
							<IonSegment className="page-links ion-width-50" color="primary">
								{pages.map((page: any) => 
									<IonItem routerLink={"/" + page.name} key={page.name} >
										<IonLabel>{page.title}</IonLabel>
									</IonItem>
								)}
								{/* {pages.map((page: any) => <IonSegmentButton key={page.name} onClick={() => openPage(page)}>{page.title}</IonSegmentButton>)} */}
							</IonSegment>
						</div>
					</IonTitle>
				</div>
			</IonToolbar>
			<RangeViewComponent isOpen={selectdRange} onDidDismiss={() => setSelectedRange(false)} availability={availability} seletGranularity={seletGranularity}/>
			{children}
		</IonHeader>
  );
};

export default HeaderView;
