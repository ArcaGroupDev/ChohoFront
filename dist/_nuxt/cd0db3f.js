(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{666:function(e,l,t){"use strict";t.r(l);var n={props:["value","id","label","required","text","new"],computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("update:value",e)}}},created:function(){this.localValue=this.new?"":this.value}},c=t(63),o=t(76),r=t.n(o),d=t(507),component=Object(c.a)(n,(function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",[t("v-text-field",{attrs:{id:e.id,label:e.label,outlined:"",rules:""!=e.required?[function(l){return!!l||e.text}]:[]},model:{value:e.localValue,callback:function(l){e.localValue=l},expression:"localValue"}})],1)}),[],!1,null,null,null);l.default=component.exports;r()(component,{VTextField:d.a})}}]);