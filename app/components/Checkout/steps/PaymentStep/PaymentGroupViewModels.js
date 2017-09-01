class IFramePaymentGroupViewModel {
	constructor(json, paymentSystems) {
		const { groupName } = json;
		const identifier = this.getIdentifier(json.groupName);

		this.identifier = identifier;
		this.iFrameOrigin = this.getIFrameOrigin(identifier);
		this.iFrameURL = this.getIFrameURL(this.iFrameOrigin, identifier, groupName, 'es');
		this.iFrameId = `#iframe-placeholder-${groupName}`;
		this.isIFrame = !0;
		this.isActive = !1;
		this.isVisible = !1;
		this.hasPreSubmitHook = !0;
		this.submitPromise = null;
		this.template("iFrame-template");
		this.isDebitCard = "debitCard" === identifier;
		this.isCustom = "creditCardCustom" === identifier;
		this.localizedLabel = ko.computed(function() {
			var translation;
			translationKey;
			return translationKey = "paymentData.paymentGroup." + _this.identifier() + ".name";
			translation = i18n.t(translationKey);
			translation === translationKey
				? _this.name
				: translation
		});
		this.payments = [];
		this.isEditingSensitiveField = !1;
		this.subscribe()
	}

	getIdentifier = (groupName) => {
		switch (groupName) {
			case 'debitCardPaymentGroup':
				return 'debitCard';
			case 'PayPalPlusPaymentGroup':
				return 'payPalPlus';
			case 'OneBuyPaymentGroup':
				return 'oneBuy';
			default:
				return groupName.indexOf('customPrivate') !== -1
					? 'creditCardCustom'
					: 'creditCard';
		}
	}

	getIFrameOrigin = (identifier) => {
		const ioURL = 'https://io.vtexpayments.com.br';

		switch (identifier) {
			case 'oneBuy':
				return 'https://h-api.onebuy.com';
			case 'payPalPlus':
				return ioURL;
			default:
				return ioURL;
		}
	}

	getIFrameURL = (iFrameOrigin, identifier, groupName, fallbackLocale) => {
		let iFrameURL = '';

		switch (identifier) {
			case 'payPalPlus':
				iFrameURL = `${iFrameOrigin}'/paypal-plus/0.2.10/index.html'`;
				break;
			case 'oneBuy':
				iFrameURL = `${iFrameOrigin}/VTex`;
				break;
			default:
				iFrameURL = `${iFrameOrigin}/card-ui/1.5.21/index.html`;
		}

		return `${iFrameURL}?paymentGroup=${groupName}&fallbackLocale=${fallbackLocale}&accountName=totemwalmartarqa`
	}
}

IFramePaymentGroupViewModel.prototype.subscribe = function() {
	var groupName;
	groupName = this.groupName(),
	radio("paymentData.isVisible").subscribe(this.setVisibility),
	radio("paymentData.paymentGroup.setActivePaymentGroup").subscribe(this.setActiveHandler),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".setupComplete").subscribe(this.setupComplete),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".setIFrameHeight").subscribe(this.setHeightHandler),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".sendOrderForm").subscribe(this.sendOrderForm),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".submitButton").subscribe(this.submitButton),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".preSubmit").subscribe(this.preSubmit),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".doSubmit").subscribe(this.doSubmit),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".sendPayments").subscribe(this.sendPayments),
	radio("vtex.i18n.update").subscribe(this.newLocale)
},
IFramePaymentGroupViewModel.prototype.unsubscribe = function() {
	var groupName;
	groupName = this.groupName(),
	radio("paymentData.isVisible").unsubscribe(this.setVisibility),
	radio("paymentData.paymentGroup.setActivePaymentGroup").unsubscribe(this.setActiveHandler),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".setIFrameHeight").unsubscribe(this.setHeightHandler),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".sendOrderForm").unsubscribe(this.sendOrderForm),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".submitButton").unsubscribe(this.submitButton),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".preSubmit").unsubscribe(this.preSubmit),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".doSubmit").unsubscribe(this.doSubmit),
	radio("paymentData.paymentGroup.iFrame." + groupName + ".sendPayments").unsubscribe(this.sendPayments),
	radio("vtex.i18n.update").unsubscribe(this.newLocale)
},
IFramePaymentGroupViewModel.prototype.setupComplete = function() {
	return this.newLocale(window.checkout.locale())
},
IFramePaymentGroupViewModel.prototype.submitButton = function(isActive) {
	return this.isEditingSensitiveField(!isActive)
},
IFramePaymentGroupViewModel.prototype.setVisibility = function(isVisible) {
	return this.isVisible = isVisible,
	this.iFrameSetVisibility(isVisible)
},
IFramePaymentGroupViewModel.prototype.setHeightHandler = function(height) {
	var $iframe;
	return $iframe = this.getIFrame(),
	$iframe.css("height", height)
},
IFramePaymentGroupViewModel.prototype.setActiveHandler = function(paymentGroupId) {
	return this.isActive = this.id === paymentGroupId,
	this.iFrameSetActive(this.isActive)
},
IFramePaymentGroupViewModel.prototype.updatePayments = function(payments) {
	return this.payments = payments
},
IFramePaymentGroupViewModel.prototype.getPayments = function() {
	return this.payments
},
IFramePaymentGroupViewModel.prototype.sendOrderForm = function(ev, orderForm) {
	var orderFormObject;
	return null == orderForm && (orderForm = window.vtexjs.checkout.orderForm),
	orderFormObject = JSON.parse(JSON.stringify(orderForm)),
	this.iFrameSendOrderForm(orderFormObject)
},
IFramePaymentGroupViewModel.prototype.afterRender = function() {
	return this.createIFrame(),
	"payPalPlus" === this.identifier()
		? this.setHeightHandler("442px")
		: void 0
},
IFramePaymentGroupViewModel.prototype.preSubmitHook = function(deferred, submitData) {
	return this.submitPromise && this.submitPromise.reject({reason: "abort"}),
	this.submitPromise = deferred,
	this.iFramePreSubmit()
},
IFramePaymentGroupViewModel.prototype.preSubmit = function(isDone) {
	return this.submitPromise
		? isDone
			? this.submitPromise.resolve()
			: this.submitPromise.reject()
		: void 0
},
IFramePaymentGroupViewModel.prototype.doSubmit = function(paymentGroup, payments) {
	return radio("checkout.paymentData.loading").broadcast(!0),
	radio("checkout.paymentData.submitIFramePayment").broadcast(paymentGroup, payments)
},
IFramePaymentGroupViewModel.prototype.sendPayments = function(payments, transactionResponse, extraData) {
	return this.iFrameSendPayments(payments, transactionResponse, extraData)
},
IFramePaymentGroupViewModel.prototype.createIFrame = function() {
	var iframe,
		onLoadFn;
	return onLoadFn = "radio('paymentData.paymentGroup.iFrame." + this.groupName() + ".sendOrderForm').broadcast()",
	iframe = "<iframe class='span12' src='" + this.iFrameURL + "' frameborder='0' onload=\"" + onLoadFn + "\" style='height: 200px'></iframe>",
	$(this.iFrameId).html(iframe),
	$(window).on("orderFormUpdated.vtex", this.sendOrderForm),
	$(window).on("authenticatedUser.vtexid", this.iFrameAuthenticatedUser)
},
IFramePaymentGroupViewModel.prototype.afterSelected = function() {
	return this.validate({
		giveFocus: !0,
		showErrorMessage: !1,
		applyErrorClass: !1
	})
},
IFramePaymentGroupViewModel.prototype.newLocale = function(locale) {
	var countriesTranslations;
	return countriesTranslations = vtex.i18n[locale].countries,
	this.iFrameSendCountriesTranslations(locale, countriesTranslations)
},
IFramePaymentGroupViewModel.prototype.getIFrame = function() {
	return $(this.iFrameId + " iframe")
},
IFramePaymentGroupViewModel.prototype.sendIframe = function(event, args) {
	var $iframe,
		e;
	$iframe = this.getIFrame();
	try {
		return $iframe[0].contentWindow.postMessage({
			event: event,
			arguments: args
		}, this.iFrameOrigin)
	} catch (_error) {
		return e = _error,
		console.log(e)
	}
},
IFramePaymentGroupViewModel.prototype.iFrameSendOrderForm = function(orderForm) {
	return this.sendIframe("orderFormUpdated.vtex", [orderForm, this.isVisible])
},
IFramePaymentGroupViewModel.prototype.iFrameAuthenticatedUser = function() {
	return this.sendIframe("authenticatedUser.vtexid", [])
},
IFramePaymentGroupViewModel.prototype.iFramePreSubmit = function() {
	return this.sendIframe("preSubmit.vtex", [])
},
IFramePaymentGroupViewModel.prototype.iFrameSetActive = function(isActive) {
	return this.sendIframe("setActive.vtex", [isActive])
},
IFramePaymentGroupViewModel.prototype.iFrameSetVisibility = function(isVisible) {
	return this.sendIframe("setVisibility.vtex", [isVisible])
},
IFramePaymentGroupViewModel.prototype.iFrameSendPayments = function(payments, transactionResponse, extraData) {
	return this.sendIframe("sendPayments.vtex", [payments, transactionResponse, extraData])
},
IFramePaymentGroupViewModel.prototype.iFrameSendCountriesTranslations = function(locale, countriesTranslations) {
	return this.sendIframe("countriesTranslations.vtex", [locale, countriesTranslations])
},
IFramePaymentGroupViewModel.prototype.getIdentifier = function(groupName) {
	var identifier;
	switch (identifier = null, groupName) {
		case "debitCardPaymentGroup":
			identifier = "debitCard";
			break;
		case "PayPalPlusPaymentGroup":
			identifier = "payPalPlus";
			break;
		case "OneBuyPaymentGroup":
			identifier = "oneBuy";
			break;
		default:
			identifier = -1 !== groupName.indexOf("customPrivate")
				? "creditCardCustom"
				: "creditCard"
	}
	return identifier
},
IFramePaymentGroupViewModel.prototype.getIFrameOrigin = function(identifier) {
	var devURL,
		ioURL;
	switch (devURL = "http://" + vtex.accountName + ".vtexlocal.com.br", ioURL = "https://io.vtexpayments.com.br", identifier) {
		case "oneBuy":
			return "https://h-api.onebuy.com";
		case "payPalPlus":
			return window.devPayPalPlus
				? devURL
				: ioURL;
		default:
			return window.devCardUI
				? devURL
				: ioURL
	}
},
IFramePaymentGroupViewModel.prototype.getIFrameURL = function(iFrameOrigin, identifier, groupName, fallbackLocale) {
	var iFrameURL;
	switch (identifier) {
		case "payPalPlus":
			iFrameURL = window.devPayPalPlus
				? iFrameOrigin + "/paypal-plus/"
				: iFrameOrigin + "/paypal-plus/0.2.10/index.html";
			break;
		case "oneBuy":
			iFrameURL = iFrameOrigin + "/VTex";
			break;
		default:
			iFrameURL = window.devCardUI
				? iFrameOrigin + "/card-ui/"
				: iFrameOrigin + "/card-ui/1.5.21/index.html"
	}
	return "" + iFrameURL + "?paymentGroup=" + groupName + "&fallbackLocale=" + fallbackLocale + "&accountName=" + vtex.accountName
}
