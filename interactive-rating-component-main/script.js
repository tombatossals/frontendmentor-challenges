document.addEventListener('DOMContentLoaded', async function () {
    var app = new Vue({
        el: "#app",
        data: {
            stars: null,    
            submitted: false
        },
        methods: {
            setStars: function(number) {
                this.stars = number;
            },
            submit: function() {
                this.submitted = true
            }
        }
    });
});