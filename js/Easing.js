var Easing = {};

// Transforme une interpolation linéaire (0 -> 1 en a/r 0 -> 1 -> 0)
// Transforme une interpolation linéaire (0 -> 1 en a/r 0 -> 1 -> 0)
Easing.back = function(t, backAt){
	if(!backAt){
		backAt = 0.5;
	}
	if(t <= backAt){
		return t / backAt;
	}else{
		return 1 - (t - backAt) / (1 - backAt);
	}
};

// simple linear Easinging - no easing, no acceleration
Easing.linear = function (t) {
	return t;
};
		

// quadratic easing in - accelerating from zero velocity
Easing.easeInQuad = function (t) {
	return t*t;
};
		

// quadratic easing out - decelerating to zero velocity
Easing.easeOutQuad = function (t) {
	return -t*(t-2);
};

		

// quadratic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutQuad = function (t) {
	t *= 2;
	if (t < 1) return 0.5*t*t;
	t--;
	return -0.5 * (t*(t-2) - 1);
};


// cubic easing in - accelerating from zero velocity
Easing.easeInCubic = function (t) {
	return t*t*t;
};

		

// cubic easing out - decelerating to zero velocity
Easing.easeOutCubic = function (t) {
	t--;
	return (t*t*t + 1);
};

		

// cubic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutCubic = function (t) {
	t *= 2;
	if (t < 1) return 0.5*t*t*t;
	t -= 2;
	return 0.5*(t*t*t + 2);
};
	

// quartic easing in - accelerating from zero velocity
Easing.easeInQuart = function (t) {
	return t*t*t*t;
};

		

// quartic easing out - decelerating to zero velocity
Easing.easeOutQuart = function (t) {
	t--;
	return -(t*t*t*t - 1);
};

		

// quartic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutQuart = function (t) {
	t *= 2;
	if (t < 1) return 0.5*t*t*t*t;
	t -= 2;
	return -0.5 * (t*t*t*t - 2);
};


// quintic easing in - accelerating from zero velocity
Easing.easeInQuint = function (t) {
	return t*t*t*t*t;
};



// quintic easing out - decelerating to zero velocity
Easing.easeOutQuint = function (t) {
	t--;
	return (t*t*t*t*t + 1);
};

		

// quintic easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutQuint = function (t) {
	t *= 2;
	if (t < 1) return 0.5*t*t*t*t*t;
	t -= 2;
	return 0.5*(t*t*t*t*t + 2);
};
		

// sinusoidal easing in - accelerating from zero velocity
Easing.easeInSine = function (t) {
	return -Math.cos(t * (Math.PI/2));
};

		

// sinusoidal easing out - decelerating to zero velocity
Easing.easeOutSine = function (t) {
	return Math.sin(t * (Math.PI/2));
};

		

// sinusoidal easing in/out - accelerating until halfway, then decelerating
Easing.easeInOutSine = function (t) {
	return -0.5 * (Math.cos(Math.PI*t) - 1);
};

		

// exponential easing in - accelerating from zero velocity
Easing.easeInExpo = function (t) {
	return Math.pow( 2, 10 * (t - 1) );
};

		

// exponential easing out - decelerating to zero velocity
Easing.easeOutExpo = function (t) {
	return ( -Math.pow( 2, -10 * t ) + 1 );
};

		

// exponential easing in/out - accelerating until halfway, then decelerating
Easing.easeInOutExpo = function (t) {
	t *= 2;
	if (t < 1) return 0.5 * Math.pow( 2, 10 * (t - 1) );
	t--;
	return 0.5 * ( -Math.pow( 2, -10 * t) + 2 );
};
		

// circular easing in - accelerating from zero velocity
Easing.easeInCirc = function (t) {
	return -(Math.sqrt(1 - t*t) - 1);
};

		

// circular easing out - decelerating to zero velocity
Easing.easeOutCirc = function (t) {
	t--;
	return Math.sqrt(1 - t*t);
};

Easing.easeInBack = function (t) {
	var s = 1.70158;
    return t * t * ( ( s + 1 ) * t - s );
}
Easing.easeOutBack = function (t, s) {
	if(!s){
		s = 1.70158;
	}
    return --t * t * ( ( s + 1 ) * t + s ) + 1;
}
		

// circular easing in/out - acceleration until halfway, then deceleration
Easing.easeInOutCirc = function (t) {
	t *= 2;
	if (t < 1) return -0.5 * (Math.sqrt(1 - t*t) - 1);
	t -= 2;
	return 0.5 * (Math.sqrt(1 - t*t) + 1);
};

Easing.easeOutElastic = function(t, f){
	var ts=t*t;
	var tc=ts*t;
	if(!f){
		f = 1;
	}
	return f*(33*tc*ts + -106*ts*ts + 126*tc + -67*ts + 15*t - 1) + 1;
};
Easing.easeInElastic = function(t){
	var ts=t*t;
	var tc=ts*t;
	return 33*tc*ts + -59*ts*ts + 32*tc + -5*ts;
};
Easing.easeOutBounce = function(t){
	if (t < (1/2.75)) {
		return (7.5625*t*t);
	} else if (t < (2/2.75)) {
		return (7.5625*(t-=(1.5/2.75))*t + .75);
	} else if (t < (2.5/2.75)) {
		return (7.5625*(t-=(2.25/2.75))*t + .9375);
	} else {
		return (7.5625*(t-=(2.625/2.75))*t + .984375);
	}
};

Easing.cycleSin = function(t, duration){
	return Math.sin(t * Math.PI * 2 / duration) * 0.5 + 0.5;
};