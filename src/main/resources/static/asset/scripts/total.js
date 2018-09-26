// 文件间约束条件说明 
// list.html里面的公式编号与本文件中的函数名称保持一致
// list.html里面的公式变量名称与deltail.html文件中的变量描述块保持一致

// 公式验证方法
// 从Chrome中通过Console下验证


//*************************GB 16507-2013*****************************
function fn_7_14(p,D_o,phi_min,sigma){
	return (p*D_o)/(2*phi_min*sigma+p);
}

function fn_7_15(p,D_i,phi_min,sigma){
	return (p*D_i)/(2*phi_min*sigma+p);
}

function fn_7_16(K_s,p,D_i,phi_min,sigma){
	return (K_s*p*D_i)/(2*phi_min*sigma-p);
}

function fn_7_20(K_f,D_i,p,sigma){
	return (K_f*D_i*Math.pow(p/sigma,1/2));
}

function fn_7_21(p,D_O,sigma){
	return (p*D_o)/(2*sigma+p);
}

function fn_7_22(K_c,Y_c,D_C,P,sigma){
	return (K_c*Y_c*D_C*Math.pow(p/sigma,1/2));
}

function fn_7_24(K_o,p,D_o,phi_w,sigma){
	return (K_o*p*D_o)/(2*phi_w*sigma+p);
}

function fn_7_26(K_i,p,D_o,phi_w,sigma){
	return (K_i*p*D_o)/(2*phi_w*sigma+p);
}

function fn_7_28(p,D_o,phi_w,sigma){
	return (p*D_o)/(2*phi_w*sigma+p);
}
//
function fn_7_34(D_i,delta_e,k){
	return (8.1*Math.pow(D_i*delta_e*(1-k),1/3));
}

function fn_7_55(phi_min,sigma,delta_e,D_i){
	return (2*phi_min*sigma*delta_e)/(D_i+delta_e);
}

function fn_7_56(phi_min,sigma,delta_e,D_o){
	return (2*phi_min*sigma*delta_e)/(D_o-delta_e);
}

function fn_7_57(phi_min,sigma,delta_e,K_s,D_i){
	return (2*phi_min*sigma*delta_e)/(K_s*D_i+delta_e);
}

function fn_7_58(phi_w,sigma,delta_e,K_o,D_o){
	return (2*phi_w*sigma*delta_e)/(K_o*D_o-delta_e);
}

function fn_7_59(phi_w,sigma,delta_e,K_i,D_o){
	return (2*phi_w*sigma*delta_e)/(K_i*D_o - delta_e);
}

function fn_7_60(phi_w,sigma,delta_e,D_o){
	return (2*phi_w*sigma*delta_e)/(D_o - delta_e);
}

function fn_7_61(delta_1,K_f,D_i,sigma){
	return (Math.pow((delta_1/(K_f*D_i)),2)*sigma);
}

function fn_7_62(delta_1,Y_c,D_c,sigma){
	return (3.3*Math.pow((delta_1/(Y_c*D_c)),2)*sigma);
}



//*************************GB 16508-2013*****************************
function fn_8_1(Yita,sigma){
	return (Yita*sigma);
}

function fn_8_4(p,D_i,phi_min,sigma){
	return (p*D_i/(2*phi_min*sigma-p));
}

function fn_8_7(p,D_o,phi_min,sigma){
	return (p*D_o/(2*phi_min*sigma+p));
}

function fn_8_9(phi_c,sigma,delta_e,D_i){
	return (2*phi_c*sigma*delta_e/(D_i+delta_e));
}

function fn_8_10(phi_c,sigma,delta_e,D_o){
	return (2*phi_c*sigma*delta_e/(D_o-delta_e));
}

function fn_8_12(p,d_o,sigma){
	return (p*d_o/(2*sigma+p));
}

function fn_8_17(phi_w,sigma,delta_e,d_o){
	return (2*phi_w*sigma*delta_e/(d_o - delta_e));
}

function fn_8_17(phi_w,sigma,delta_be,K_1,d_o){
	return (2*phi_w*sigma*delta_be/(K_1*d_o - delta_be));
}

function fn_8_46(B,D_m,miu,L){
	return ((B/2)*(1+Math.power(1+(0.12*D_m*miu/(B*(1+D_m/(0.3*L)))),1/2))+1);
}
//
function fn_8_48_1(p,D_m,n_1,R_eL,L,t){
	return (p*D_m*n_1/(2*Math.power(R_eL,t)*(1+D_m/(15*L))));
}

function fn_8_48_2(D_m,p,L,n_2,E,t){
	return (Math.power(D_m,0.6)*(p*L*n_2/(1.73*Math.power(E,t)))+1);
}

function fn_8_49(R_eL_t,delta,n_1,D_m,L,miu){
	return 2*R_eL_t*(delta-1)/n_1/D_m*((1+D_m/15/L)/(1+0.03*D_m*miu/(delta-1)/(1+D_m/0.3/L)))
}

function fn_8_50(E_t,delta,L,D_m,n_2){
	return 1.73*E_t*Math.pow(delta-1,2.5)/L/(Math.pow(D_m,1.5))/n_2
}

function fn_8_51(p,D_i,phi_min,R_m,L,D_i){
	return 1.5*p*D_i/phi_min/R_m*(1+Math.pow(1+4.4*L/p/(L+D_i),1/2))+2
}

function fn_8_52(phi_min,R_m,delta,D_i,L){
	return phi_min*R_m*(delta-2)/1.5/D_i/(6.6*L*D_i/phi_min/R_m/(L+D_i)/(delta-2)+2)
}

function fn_8_54(p,D_o,sigma){
	return p*D_o/2/sigma+1
}

function fn_8_55(delta,sigma,D_o){
	return 2*(delta-1)*sigma/D_o
}

function fn_8_66(p,d_o,sigma,C){
	return p*d_o/2/sigma+C
}

function fn_8_67(sigma,delta,C,d_o){
	return 2*sigma*(delta-C)/d_o
}

function fn_8_68(p,D_i,Y,phi,sigma,C){
	return p*D_i*Y/(2*phi*sigma-0.5*p)+C
}

function fn_8_69(phi,sigma,delta_e,D_i,Y){
	return 2*phi*sigma*delta_e/(D_i*Y+0.5*delta_e)
}

function fn_8_76(K,d_e,p,sigma){
	return K*d_e*(Math.pow(p/sigma))+1
}

function fn_8_77(delta,K,d_e,sigma){
	return Math.pow((delta-1)/K/d_e,2)*sigma
}
//
function fn_8_78(p,d_e,C,d_h){
	return 0.62*(Math.pow(p/d_e*(C*Math.pow(d_e,2)-Math.pow(d_h,2))))
}

function fn_8_79(sigma_b,delta,C,d_e,d_h){
	return 2.60*sigma_b*(Math.pow(delta,2))/(C*Math.pow(d_e,2)-Math.pow(d_h,2))
}