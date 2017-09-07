const ORDER_PLACED = 'checkout/ORDER_PLACED';

const initialState = {
	orders: [
		{
			"orderId": "v502681wmarq-01",
			"orderGroup": "v502681wmarq",
			"state": "order-completed",
			"isCheckedIn": false,
			"sellerOrderId": "00-v502681wmarq-01",
			"storeId": null,
			"value": 332318,
			"items": [
				{
					"uniqueId": "1661E3B190A544CE82C4ABE1D5FB17A6",
					"id": "14",
					"productId": "15",
					"refId": "0779314700098",
					"ean": "7793147000981",
					"name": "Cerveza Ret Lager Imperial 1lt",
					"skuName": "Cerveza Ret Lager Imperial 1lt",
					"modalType": null,
					"priceValidUntil": "2018-09-07T20:24:34.3609695Z",
					"tax": 0,
					"price": 3000,
					"listPrice": 3200,
					"manualPrice": null,
					"sellingPrice": 3000,
					"rewardValue": 0,
					"isGift": false,
					"additionalInfo": {
						"brandName": "Imperial",
						"brandId": "136",
						"offeringInfo": null,
						"offeringType": null,
						"offeringTypeId": null
					},
					"preSaleDate": "2012-12-04T00:00:00",
					"productCategoryIds": "/355/356/",
					"productCategories": {
						"355": "Cervezas",
						"356": "Rubias"
					},
					"defaultPicker": null,
					"handlerSequence": 0,
					"handling": false,
					"quantity": 1,
					"seller": "1",
					"imageUrl": "http://walmartarqa.vteximg.com.br/arquivos/ids/160055-100-100/0779314700098-1.jpg",
					"detailUrl": "/cerveza-ret-lager-imperial-1lt/p",
					"components": [],
					"bundleItems": [],
					"attachments": [],
					"itemAttachment": {
						"name": null,
						"content": {}
					},
					"attachmentOfferings": [],
					"offerings": [],
					"priceTags": [],
					"availability": "available",
					"measurementUnit": "un",
					"unitMultiplier": 1
				}, {
					"uniqueId": "628D711F38C84CA29569D3038F96E3A0",
					"id": "9",
					"productId": "10",
					"refId": "0779808568029",
					"ean": "7798085680295",
					"name": "Jugo Naranja Durazno Citric 500 Cc",
					"skuName": "Jugo Naranja Durazno Citric 500 Cc",
					"modalType": null,
					"priceValidUntil": "2018-09-07T20:24:34.3609695Z",
					"tax": 0,
					"price": 2318,
					"listPrice": 3000,
					"manualPrice": null,
					"sellingPrice": 2318,
					"rewardValue": 0,
					"isGift": false,
					"additionalInfo": {
						"brandName": "Citric",
						"brandId": "185",
						"offeringInfo": null,
						"offeringType": null,
						"offeringTypeId": null
					},
					"preSaleDate": "2015-07-27T00:00:00",
					"productCategoryIds": "/403/410/",
					"productCategories": {
						"403": "Jugos",
						"410": "Jugos Refrigerados"
					},
					"defaultPicker": null,
					"handlerSequence": 0,
					"handling": false,
					"quantity": 1,
					"seller": "1",
					"imageUrl": "http://walmartarqa.vteximg.com.br/arquivos/ids/170826-100-100/0779808568029-1.jpg",
					"detailUrl": "/jugo-naranja-durazno-citric-500-cc/p",
					"components": [],
					"bundleItems": [],
					"attachments": [],
					"itemAttachment": {
						"name": null,
						"content": {}
					},
					"attachmentOfferings": [],
					"offerings": [],
					"priceTags": [],
					"availability": "available",
					"measurementUnit": "un",
					"unitMultiplier": 1
				}, {
					"uniqueId": "9E107F6A2CB5439B97A795D5CE393135",
					"id": "2",
					"productId": "3",
					"refId": "0779052001173",
					"ean": "7790520011732",
					"name": "Repelente Percha Antipolilla Raid 6gr 2u",
					"skuName": "Repelente Percha Antipolilla Raid 6gr 2u",
					"modalType": null,
					"priceValidUntil": "2018-09-07T20:24:34.3609695Z",
					"tax": 0,
					"price": 327000,
					"listPrice": 357000,
					"manualPrice": null,
					"sellingPrice": 327000,
					"rewardValue": 0,
					"isGift": false,
					"additionalInfo": {
						"brandName": "Raid",
						"brandId": "702",
						"offeringInfo": null,
						"offeringType": null,
						"offeringTypeId": null
					},
					"preSaleDate": "1995-07-12T00:00:00",
					"productCategoryIds": "/345/349/",
					"productCategories": {
						"345": "Insecticidas",
						"349": "Polillas y Pulgas"
					},
					"defaultPicker": null,
					"handlerSequence": 0,
					"handling": false,
					"quantity": 1,
					"seller": "1",
					"imageUrl": "http://walmartarqa.vteximg.com.br/arquivos/ids/176255-100-100/Repelente-Percha-Antipolilla-Raid-6gr-2u-1-2.jpg",
					"detailUrl": "/repelente-percha-antipolilla-raid-6gr-2u/p",
					"components": [],
					"bundleItems": [],
					"attachments": [],
					"itemAttachment": {
						"name": null,
						"content": {}
					},
					"attachmentOfferings": [],
					"offerings": [],
					"priceTags": [],
					"availability": "available",
					"measurementUnit": "un",
					"unitMultiplier": 1
				}
			],
			"sellers": [
				{
					"id": "1",
					"name": "WALMART ARGENTINA QA",
					"logo": ""
				}
			],
			"totals": [
				{
					"id": "Items",
					"name": "Total de los itens",
					"value": 332318
				}, {
					"id": "Discounts",
					"name": "Total de descuentos",
					"value": 0
				}, {
					"id": "Shipping",
					"name": "Costo total del envío",
					"value": 0
				}, {
					"id": "Tax",
					"name": "Costo total del cambio",
					"value": 0
				}
			],
			"clientProfileData": {
				"attachmentId": "clientProfileData",
				"email": "joshua@fizzmod.com",
				"firstName": "Jos***",
				"lastName": "***",
				"document": "*8*2*3*9",
				"documentType": "dni",
				"phone": "******9462",
				"corporateName": null,
				"tradeName": null,
				"corporateDocument": null,
				"stateInscription": null,
				"corporatePhone": null,
				"isCorporate": false,
				"profileCompleteOnLoading": false,
				"profileErrorOnLoading": false,
				"customerClass": null
			},
			"ratesAndBenefitsData": {
				"attachmentId": "ratesAndBenefitsData",
				"rateAndBenefitsIdentifiers": [],
				"teaser": []
			},
			"shippingData": {
				"attachmentId": "shippingData",
				"address": {
					"addressType": "residential",
					"receiverName": "Jos***",
					"addressId": "dfe28d334ca34197a29bc454c551dd00",
					"postalCode": "*6*5",
					"city": "Ciu*** ******** ****** *****",
					"state": "CIUDAD AUTÓNOMA DE BUENOS AIRES",
					"country": "ARG",
					"street": "** ****no",
					"number": "****",
					"neighborhood": "",
					"complement": null,
					"reference": null,
					"geoCoordinates": []
				},
				"logisticsInfo": [
					{
						"itemIndex": 0,
						"selectedSla": "Retiro en tienda Pilar",
						"slas": [
							{
								"id": "Retiro en tienda Pilar",
								"name": "Retiro en tienda Pilar",
								"deliveryIds": [
									{
										"courierId": "RT-1087",
										"warehouseId": "10fd999",
										"dockId": "1579e32",
										"courierName": "Retiro en tienda Pilar",
										"quantity": 1
									}
								],
								"shippingEstimate": "3d",
								"shippingEstimateDate": "2017-09-23T00:00:00",
								"lockTTL": "12d",
								"availableDeliveryWindows": [
									{
										"startDateUtc": "2017-09-20T00:00:00+00:00",
										"endDateUtc": "2017-09-23T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-21T00:00:00+00:00",
										"endDateUtc": "2017-09-24T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-22T00:00:00+00:00",
										"endDateUtc": "2017-09-25T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-23T00:00:00+00:00",
										"endDateUtc": "2017-09-26T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-24T00:00:00+00:00",
										"endDateUtc": "2017-09-27T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-25T00:00:00+00:00",
										"endDateUtc": "2017-09-28T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-26T00:00:00+00:00",
										"endDateUtc": "2017-09-29T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}
								],
								"deliveryWindow": {
									"startDateUtc": "2017-09-23T00:00:00+00:00",
									"endDateUtc": "2017-09-26T00:00:00+00:00",
									"price": 0,
									"lisPrice": 0,
									"tax": 0
								},
								"price": 0,
								"listPrice": 0,
								"tax": 0,
								"pickupStoreInfo": {
									"isPickupStore": false,
									"friendlyName": null,
									"address": null,
									"additionalInfo": null,
									"dockId": null
								}
							}, {
								"id": "Envio a domicilio Pilar",
								"name": "Envio a domicilio Pilar",
								"deliveryIds": [
									{
										"courierId": "ED-1087",
										"warehouseId": "10fd999",
										"dockId": "1579e32",
										"courierName": "Envio a domicilio Pilar",
										"quantity": 1
									}
								],
								"shippingEstimate": "3d",
								"shippingEstimateDate": null,
								"lockTTL": "12d",
								"availableDeliveryWindows": [
									{
										"startDateUtc": "2017-09-20T00:00:00+00:00",
										"endDateUtc": "2017-09-23T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-21T00:00:00+00:00",
										"endDateUtc": "2017-09-24T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-22T00:00:00+00:00",
										"endDateUtc": "2017-09-25T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-23T00:00:00+00:00",
										"endDateUtc": "2017-09-26T00:00:00+00:00",
										"price": 8000,
										"lisPrice": 8000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-24T00:00:00+00:00",
										"endDateUtc": "2017-09-27T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-25T00:00:00+00:00",
										"endDateUtc": "2017-09-28T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-26T00:00:00+00:00",
										"endDateUtc": "2017-09-29T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}
								],
								"deliveryWindow": null,
								"price": 768,
								"listPrice": 768,
								"tax": 0,
								"pickupStoreInfo": {
									"isPickupStore": false,
									"friendlyName": null,
									"address": null,
									"additionalInfo": null,
									"dockId": null
								}
							}
						],
						"shipsTo": ["ARG"],
						"itemId": "14"
					}, {
						"itemIndex": 1,
						"selectedSla": "Retiro en tienda Pilar",
						"slas": [
							{
								"id": "Retiro en tienda Pilar",
								"name": "Retiro en tienda Pilar",
								"deliveryIds": [
									{
										"courierId": "RT-1087",
										"warehouseId": "10fd999",
										"dockId": "1579e32",
										"courierName": "Retiro en tienda Pilar",
										"quantity": 1
									}
								],
								"shippingEstimate": "3d",
								"shippingEstimateDate": "2017-09-23T00:00:00",
								"lockTTL": "12d",
								"availableDeliveryWindows": [
									{
										"startDateUtc": "2017-09-20T00:00:00+00:00",
										"endDateUtc": "2017-09-23T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-21T00:00:00+00:00",
										"endDateUtc": "2017-09-24T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-22T00:00:00+00:00",
										"endDateUtc": "2017-09-25T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-23T00:00:00+00:00",
										"endDateUtc": "2017-09-26T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-24T00:00:00+00:00",
										"endDateUtc": "2017-09-27T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-25T00:00:00+00:00",
										"endDateUtc": "2017-09-28T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-26T00:00:00+00:00",
										"endDateUtc": "2017-09-29T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}
								],
								"deliveryWindow": {
									"startDateUtc": "2017-09-23T00:00:00+00:00",
									"endDateUtc": "2017-09-26T00:00:00+00:00",
									"price": 0,
									"lisPrice": 0,
									"tax": 0
								},
								"price": 0,
								"listPrice": 0,
								"tax": 0,
								"pickupStoreInfo": {
									"isPickupStore": false,
									"friendlyName": null,
									"address": null,
									"additionalInfo": null,
									"dockId": null
								}
							}, {
								"id": "Envio a domicilio Pilar",
								"name": "Envio a domicilio Pilar",
								"deliveryIds": [
									{
										"courierId": "ED-1087",
										"warehouseId": "10fd999",
										"dockId": "1579e32",
										"courierName": "Envio a domicilio Pilar",
										"quantity": 1
									}
								],
								"shippingEstimate": "3d",
								"shippingEstimateDate": null,
								"lockTTL": "12d",
								"availableDeliveryWindows": [
									{
										"startDateUtc": "2017-09-20T00:00:00+00:00",
										"endDateUtc": "2017-09-23T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-21T00:00:00+00:00",
										"endDateUtc": "2017-09-24T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-22T00:00:00+00:00",
										"endDateUtc": "2017-09-25T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-23T00:00:00+00:00",
										"endDateUtc": "2017-09-26T00:00:00+00:00",
										"price": 8000,
										"lisPrice": 8000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-24T00:00:00+00:00",
										"endDateUtc": "2017-09-27T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-25T00:00:00+00:00",
										"endDateUtc": "2017-09-28T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-26T00:00:00+00:00",
										"endDateUtc": "2017-09-29T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}
								],
								"deliveryWindow": null,
								"price": 224,
								"listPrice": 224,
								"tax": 0,
								"pickupStoreInfo": {
									"isPickupStore": false,
									"friendlyName": null,
									"address": null,
									"additionalInfo": null,
									"dockId": null
								}
							}
						],
						"shipsTo": ["ARG"],
						"itemId": "9"
					}, {
						"itemIndex": 2,
						"selectedSla": "Retiro en tienda Pilar",
						"slas": [
							{
								"id": "Retiro en tienda Pilar",
								"name": "Retiro en tienda Pilar",
								"deliveryIds": [
									{
										"courierId": "RT-1087",
										"warehouseId": "10fd999",
										"dockId": "1579e32",
										"courierName": "Retiro en tienda Pilar",
										"quantity": 1
									}
								],
								"shippingEstimate": "3d",
								"shippingEstimateDate": "2017-09-23T00:00:00",
								"lockTTL": "12d",
								"availableDeliveryWindows": [
									{
										"startDateUtc": "2017-09-20T00:00:00+00:00",
										"endDateUtc": "2017-09-23T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-21T00:00:00+00:00",
										"endDateUtc": "2017-09-24T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-22T00:00:00+00:00",
										"endDateUtc": "2017-09-25T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-23T00:00:00+00:00",
										"endDateUtc": "2017-09-26T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-24T00:00:00+00:00",
										"endDateUtc": "2017-09-27T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-25T00:00:00+00:00",
										"endDateUtc": "2017-09-28T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-26T00:00:00+00:00",
										"endDateUtc": "2017-09-29T00:00:00+00:00",
										"price": 0,
										"lisPrice": 0,
										"tax": 0
									}
								],
								"deliveryWindow": {
									"startDateUtc": "2017-09-23T00:00:00+00:00",
									"endDateUtc": "2017-09-26T00:00:00+00:00",
									"price": 0,
									"lisPrice": 0,
									"tax": 0
								},
								"price": 0,
								"listPrice": 0,
								"tax": 0,
								"pickupStoreInfo": {
									"isPickupStore": false,
									"friendlyName": null,
									"address": null,
									"additionalInfo": null,
									"dockId": null
								}
							}, {
								"id": "Envio a domicilio Pilar",
								"name": "Envio a domicilio Pilar",
								"deliveryIds": [
									{
										"courierId": "ED-1087",
										"warehouseId": "10fd999",
										"dockId": "1579e32",
										"courierName": "Envio a domicilio Pilar",
										"quantity": 1
									}
								],
								"shippingEstimate": "3d",
								"shippingEstimateDate": null,
								"lockTTL": "12d",
								"availableDeliveryWindows": [
									{
										"startDateUtc": "2017-09-20T00:00:00+00:00",
										"endDateUtc": "2017-09-23T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-21T00:00:00+00:00",
										"endDateUtc": "2017-09-24T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-22T00:00:00+00:00",
										"endDateUtc": "2017-09-25T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-23T00:00:00+00:00",
										"endDateUtc": "2017-09-26T00:00:00+00:00",
										"price": 8000,
										"lisPrice": 8000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-24T00:00:00+00:00",
										"endDateUtc": "2017-09-27T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-25T00:00:00+00:00",
										"endDateUtc": "2017-09-28T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}, {
										"startDateUtc": "2017-09-26T00:00:00+00:00",
										"endDateUtc": "2017-09-29T00:00:00+00:00",
										"price": 4000,
										"lisPrice": 4000,
										"tax": 0
									}
								],
								"deliveryWindow": null,
								"price": 8,
								"listPrice": 8,
								"tax": 0,
								"pickupStoreInfo": {
									"isPickupStore": false,
									"friendlyName": null,
									"address": null,
									"additionalInfo": null,
									"dockId": null
								}
							}
						],
						"shipsTo": ["ARG"],
						"itemId": "2"
					}
				],
				"availableAddresses": [
					{
						"addressType": "residential",
						"receiverName": "Jos***",
						"addressId": "dfe28d334ca34197a29bc454c551dd00",
						"postalCode": "*6*5",
						"city": "Ciu*** ******** ****** *****",
						"state": "CIUDAD AUTÓNOMA DE BUENOS AIRES",
						"country": "ARG",
						"street": "** ****no",
						"number": "****",
						"neighborhood": "",
						"complement": null,
						"reference": null,
						"geoCoordinates": []
					}
				]
			},
			"paymentData": {
				"attachmentId": "paymentData",
				"transactionId": "F27A9C0443E744B2B8715240FAC66EE8",
				"payments": [
					{
						"id": "8C46033A781248A19DC18146F11AA211",
						"paymentSystem": "201",
						"paymentSystemName": "Teste Promissory",
						"value": 332318,
						"installments": 1,
						"connectorResponses": {},
						"referenceValue": 332318,
						"cardHolder": null,
						"cardNumber": null,
						"firstDigits": null,
						"lastDigits": null,
						"cvv2": null,
						"expireMonth": null,
						"expireYear": null,
						"url": null,
						"koinUrl": null,
						"tid": null,
						"redemptionCode": null,
						"giftCardId": null,
						"giftCardProvider": null,
						"giftCardAsDiscount": null,
						"group": "promissory",
						"dueDate": null,
						"accountId": null,
						"parentAccountId": null
					}
				],
				"giftCards": [],
				"transactions": [
					{
						"isActive": true,
						"transactionId": "F27A9C0443E744B2B8715240FAC66EE8",
						"merchantName": "TOTEMWALMARTARQA",
						"payments": [
							{
								"id": "8C46033A781248A19DC18146F11AA211",
								"paymentSystem": "201",
								"paymentSystemName": "Teste Promissory",
								"value": 332318,
								"installments": 1,
								"connectorResponses": {},
								"referenceValue": 332318,
								"cardHolder": null,
								"cardNumber": null,
								"firstDigits": null,
								"lastDigits": null,
								"cvv2": null,
								"expireMonth": null,
								"expireYear": null,
								"url": null,
								"koinUrl": null,
								"tid": null,
								"redemptionCode": null,
								"giftCardId": null,
								"giftCardProvider": null,
								"giftCardAsDiscount": null,
								"group": "promissory",
								"dueDate": null,
								"accountId": null,
								"parentAccountId": null
							}
						]
					}
				],
				"merchantName": "TOTEMWALMARTARQA"
			},
			"clientPreferencesData": null,
			"commercialConditionData": null,
			"giftRegistryData": null,
			"marketingData": null,
			"storePreferencesData": {
				"countryCode": "ARG",
				"checkToSavePersonDataByDefault": false,
				"templateOptions": {
					"toggleCorporate": false
				},
				"timeZone": "Argentina Standard Time",
				"currencyCode": "ARS",
				"currencyLocale": 11274,
				"currencySymbol": "$",
				"currencyFormatInfo": {
					"currencyDecimalDigits": 2,
					"currencyDecimalSeparator": ",",
					"currencyGroupSeparator": ".",
					"currencyGroupSize": 3,
					"startsWithCurrencySymbol": true
				}
			},
			"openTextField": null,
			"customData": null,
			"hooksData": null,
			"changeData": null,
			"salesChannel": "25",
			"followUpEmail": "57760c6a0cbd4b0c93c3f3e8d934708d@ct.vtex.com.br",
			"creationDate": "2017-09-07T20:24:30.205788Z",
			"lastChange": "2017-09-07T20:24:39.8176325Z",
			"timeZoneCreationDate": "2017-09-07T17:24:30.205788",
			"timeZoneLastChange": "2017-09-07T17:24:39.8176325",
			"isCompleted": true,
			"hostName": "totemwalmartarqa",
			"merchantName": null,
			"userType": "",
			"roundingError": 0,
			"allowEdition": false,
			"allowCancellation": true
		}
	]
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ORDER_PLACED:
			return {
				...state,
				orders: action.payload
			};
		default:
			return state;
	}
}

export function orderPlaced(orders) {
	return {type: ORDER_PLACED, payload: orders};
}
