import { Alert, Linking, Platform, PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service'
export default class Permissions {

	static IOS_on_Camera_Permission_Denied() {
		if (Platform.OS == 'ios') {
			Alert.alert("Oops", "App is not allowed to use camera. Go to Settings -> Marketplace and enable camera.", [
				{
					text: 'Enable Camera', onPress: () => {
						Linking.openURL("app-settings:")

					}
				}
				,
				{
					text: 'Cancel'
				}

			]);
		}
	}

	static On_Location_Permission_Denied() {
		return new Promise((res: any, rej: any) => {
			Alert.alert("Oops", "App is not allowed to use location or your device's location is turned off. Go to Settings -> Marketplace and enable location.", [
				{
					text: 'Enable Location', onPress: () => {
						Platform.OS == 'ios' ? Linking.openURL("app-settings:").then(res) : Linking.openSettings().then(res)
					}
				}
				,
				{
					text: 'Cancel', onPress: rej
				}

			]);
		})
	}
	static requestCameraPermission(): Promise<any> {
		return new Promise(async (resolve: any, reject: any) => {
			try {
				if (Platform.OS == 'ios') {
					resolve()
					return;
				}
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA,
					{
						title: 'Marketplace',
						message:
							'Marketplace needs access to your external storage ' +
							'so you can download documents.',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK',
					},
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					resolve()
				} else {
					reject()
				}
			} catch (err) {
				reject()
			}
		})

	}

	static requestLocationPermission(): Promise<any> {
		return new Promise(async (resolve: any, reject: any) => {
			try {
				if (Platform.OS == 'ios') {
					Geolocation.requestAuthorization("whenInUse").then((result: Geolocation.AuthorizationResult) => {
						result = result
						switch (result) {

							case 'granted':
								resolve();
								break;
							default:
								reject();
								break;
						}
					})
					return;
				}
				const granted = await PermissionsAndroid.request(
					'android.permission.ACCESS_FINE_LOCATION',
					{
						title: 'Marketplace',
						message:
							'Marketplace needs access to your location',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK',
					},
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					resolve()
				} else {
					reject()
				}
			} catch (err) {
				reject()
			}
		})

	}
	static requestStoragePermission(): Promise<any> {
		return new Promise(async (resolve: any, reject: any) => {
			try {
				if (Platform.OS == 'ios') {
					resolve()
					return;
				}
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'Marketplace',
						message:
							'Marketplace needs access to your external storage ' +
							'so you can download documents.',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK',
					},
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					resolve()
				} else {
					reject()
				}
			} catch (err) {
				reject()
			}
		})

	}
}