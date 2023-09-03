class allBeards {
    eat(): any { };


}
class flyableBears extends allBeards {
    fly(): any { };
}
class swimBeards extends allBeards {
    swim(): any { };

}
class _duck extends swimBeards {
    eat(): any { };
    swim(): any { };
}