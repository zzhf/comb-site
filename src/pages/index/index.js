import './../../assets/style/main.scss';
import $ from 'jquery';
import L from 'leaflet';
import logo from './../../assets/images/logo.png';

const index = {
	init: function() {
		$('#logo').attr('src', logo);
	}
}

index.init();

export default index;