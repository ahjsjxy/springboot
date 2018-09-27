var MQ = MathQuill.getInterface(2);
var config = {
    //handlers: {edit: function(){ console.log(1)}},
    restrictMismatchedBrackets: true
};
function mathField(id,config,field){
    var dom = document.getElementById(id);
    var box = MQ.MathField(dom, config);
    box.latex(field);
}
mathField('fn_7_14_fiel', config,'\\delta_e=\\frac{pD_o}{2\\varphi_{\\min}\\left[\\sigma\\right]+p}');
mathField('fn_7_15_fiel', config,'\\delta_e=\\frac{pD_i}{2\\varphi_{\\min}\\left[\\sigma\\right]+p}');
mathField('fn_7_16_fiel', config,'\\delta_t=K_s\\frac{pD_i}{2\\varphi_{\\min}\\left[\\sigma\\right]-p}');
mathField('fn_7_20_fiel', config,'\\delta_t=K_fD_i\\sqrt{\\frac{p}{\\left[\\sigma\\right]}}');
mathField('fn_7_21_fiel', config,'\\delta_t=\\frac{pD_o}{2\\left[\\sigma\\right]+p}');
mathField('fn_7_22_fiel', config,'\\delta_t=K_cY_cD_c\\sqrt{\\frac{p}{\\left[\\sigma\\right]}}');
mathField('fn_7_24_fiel', config,'\\delta_t=K_o\\frac{pD_o}{2\\varphi\\left[\\sigma\\right]+p}');
mathField('fn_7_26_fiel', config,'\\delta_t=K_t\\frac{pD_o}{2\\varphi_w\\left[\\sigma\\right]+p}');
mathField('fn_7_28_fiel', config,'\\delta_t=\\frac{pD_o}{2\\varphi_w\\left[\\sigma\\right]+p}');
mathField('fn_7_34_fiel', config,' \\left[d\\right]=8.1^3\\sqrt{D_i\\delta_e\\left(1-k\\right)}');
mathField('fn_7_55_fiel', config,' \\left[p\\right]=\\frac{2\\varphi_{\\min}\\left[\\sigma\\right]\\delta_e}{D_i+\\delta_e}');
mathField('fn_7_56_fiel', config,'\\left[p\\right]=\\frac{2\\varphi_{\\min}\\left[\\sigma\\right]\\delta_e}{D_o-\\delta_e}');
mathField('fn_7_57_fiel', config,'\\left[p\\right]=\\frac{2\\varphi_{\\min}\\left[\\sigma\\right]\\delta_e}{K_sD_i+\\delta_e}');
mathField('fn_7_58_fiel', config,'\\left[p\\right]_o=\\frac{2\\varphi_w\\left[\\sigma\\right]\\delta_e}{K_oD_o-\\delta_e}');
mathField('fn_7_59_fiel', config,'\\left[p\\right]_i=\\frac{2\\varphi_w\\left[\\sigma\\right]\\delta_e}{K_iD_o-\\delta_e}');
mathField('fn_7_60_fiel', config,'\\left[p\\right]_m=\\frac{2\\varphi_w\\left[\\sigma\\right]\\delta_e}{D_o-\\delta_e}');
mathField('fn_7_61_fiel', config,'\\left[p\\right]=\\left(\\frac{\\delta_1}{K_fD_i}\\right)^2\\left[\\sigma\\right]');
mathField('fn_7_62_fiel', config,'\\left[p\\right]=3.3\\left(\\frac{\\delta_1}{Y_cD_c}\\right)^2\\left[\\sigma\\right]');
/*
mathField('fn_8_1_fiel', config,' \\left[\\sigma\\right]=\\eta\\left[\\sigma\\right]_j');
mathField('fn_8_4_fiel', config,'\\delta_c=\\frac{pD_i}{2\\varphi_{\\min}\\left[\\sigma\\right]-p}');
mathField('fn_8_7_fiel', config,'\\delta_c=\\frac{pD_o}{2\\varphi_{\\min}\\left[\\sigma\\right]+p}');
mathField('fn_8_9_fiel', config,'\\left[p\\right]=\\frac{2\\varphi_c\\left[\\sigma\\right]\\delta_e}{D_i+\\delta_e}');
mathField('fn_8_10_fiel', config,'\\left[p\\right]=\\frac{2\\varphi_c\\left[\\sigma\\right]\\delta_e}{D_o-\\delta_o}');
mathField('fn_8_12_fiel', config,'\\delta_c=\\frac{pd_o}{2\\left[\\sigma\\right]+p}');
mathField('fn_8_17_fiel', config,'\\left[p\\right]=\\frac{2\\varphi_w\\left[\\sigma\\right]\\delta_e}{d_o-\\delta_e}');
mathField('fn_8_19_fiel', config,'\\left[p\\right]_w=\\frac{2\\varphi_w\\left[\\sigma\\right]\\delta_{be}}{k_1d_o-\\delta_{be}}');
mathField('fn_8_46_fiel', config,'\\delta_s=\\frac{B}{2}\\left[1+\\sqrt{1+\\frac{0.12D_m\\mu}{B\\left(1+\\frac{D_m}{0.3L}\\right)}}\\right]+1');
mathField('fn_8_48_fiel', config,'B=\\frac{pD_mn_1}{2R_{eL}^t\\left(1+\\frac{D_m}{15L}\\right)}');
mathField('fn_8_49_fiel', config,'\\left[p\\right]=\\frac{2R_{eL}^t\\left(\\delta-1\\right)}{n_1D_m}\\left[\\frac{1+\\frac{D_m}{15L}}{1+\\frac{0.03D_m\\mu}{\\left(\\delta-1\\right)\\left(1+\\frac{D_m}{0.3L}\\right)}}\\right]');
mathField('fn_8_50_fiel', config,'\\left[p\\right]=\\frac{1.73D^t\\left(\\delta-1\\right)^{2.5}}{LD_m^{1.5}n_2}');
mathField('fn_8_51_fiel', config,'\\delta_s=1.5\\frac{pD_i}{\\varphi_{_{\\min}R_m}}\\left[1+\\sqrt{1+\\frac{4.4L}{p\\left(L+D_i\\right)}}\\right]+2');
mathField('fn_8_52_fiel', config,'\\left[p\\right]=\\frac{\\varphi_{\\min}R_m\\left(\\delta-2\\right)}{1.5D_i\\left[\\frac{6.6LD_i}{\\varphi_{\\min}R_m\\left[L+D_i\\right]\\left[\\delta-2\\right]}+2\\right]}');
mathField('fn_8_54_fiel', config,'\\delta_s=1.5\\frac{pD_o}{2\\left[\\sigma\\right]}+1');
mathField('fn_8_55_fiel', config,'\\left[p\\right]=\\frac{2\\left(\\delta-1\\right)\\left[\\sigma\\right]}{D_o}');
mathField('fn_8_66_fiel', config,'\\delta\\ge\\frac{pd_o}{2\\left[\\sigma\\right]}+C');
mathField('fn_8_67_fiel', config,'\\left[p\\right]=\\frac{2\\left[\\sigma\\right]\\left(\\delta-C\\right)}{d_o}');
mathField('fn_8_68_fiel', config,'\\delta\\ge\\frac{pD_iY}{2\\varphi\\left[\\sigma\\right]-0.5p}+C');
mathField('fn_8_69_fiel', config,'\\left[p\\right]=\\frac{2\\varphi\\left[\\sigma\\right]\\delta_e}{D_iY+0.5\\delta_e}');
mathField('fn_8_76_fiel', config,'\\delta>kd_e\\sqrt{\\frac{p}{\\left[\\sigma\\right]}}+1');
mathField('fn_8_77_fiel', config,'\\left[p\\right]=\\left(\\frac{\\left(\\delta-1\\right)^2}{Kd_e}\\right)\\left[\\sigma\\right]');
mathField('fn_8_78_fiel', config,'\\delta>0.62\\sqrt{\\frac{p}{d_e}\\left(Cd_e^2-d_n^2\\right)}');
mathField('fn_8_79_fiel', config,'\\left[p\\right]=2.60\\sigma_b\\frac{\\delta^2}{Cd_e^2-d_n^2}');*/
