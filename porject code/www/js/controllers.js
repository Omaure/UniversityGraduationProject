/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})


    .controller( "MainCtrl", function ($scope, StorageService) {
    $scope.things = StorageService.getAll();
    $scope.add = function (newThing) {
        StorageService.add(newThing);
    };
    $scope.remove = function (thing) {
        StorageService.remove(thing);
    };

})


    .controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,ionicMaterialMotion,$ionicActionSheet,$ionicPopup,$state,$ionicPlatform) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
        // Set Ink
        ionicMaterialInk.displayEffect();

        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);


        $scope.age = window.localStorage.getItem("uAge");
        $scope.weight = parseInt(window.localStorage.getItem("uWeight"));
        $scope.type = window.localStorage.getItem("uType");

        $scope.validateMaxLength = function(input){
            var inputLen = input.length;
            if (inputLen > 3)
                $scope.weight = $scope.weight .substring(0,3);

        }

        $scope.showActionsheet = function() {
            $ionicActionSheet.show({
                titleText: 'العمر',
                buttons: [
                    { text: '<i class="icon ion-person"></i> <18' },
                    { text: '<i class="icon ion-person"></i> 18-24' },
                    { text: '<i class="icon ion-person"></i> 25-34' },
                    { text: '<i class="icon ion-person"></i> 35-50' },
                    { text: '<i class="icon ion-person"></i> >50' },

                ],
                cancelText: 'الرجوع',
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    if(index === 0) {
                        $scope.age ='<18';
                    }
                    if(index === 1) {
                        $scope.age ='18-24';
                    }
                    if(index === 2) {
                        $scope.age ='25-34';
                    }
                    if(index === 3) {
                        $scope.age ='35-50';
                    }
                    if(index === 4) {
                        $scope.age ='>50';
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };

        $scope.showActionsheet3 = function() {

            $ionicActionSheet.show({
                titleText: 'نوع السكر',
                buttons: [
                    { text: '<i class="icon ion-heart"></i> سليم ' },
                    { text: '<i class="icon ion-heart"></i> سكري نوع ١' },
                    { text: '<i class="icon ion-ios-heart"></i> سكري نوع ٢' },
                ],
                cancelText: 'الرجوع',
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    if(index === 0) {
                        $scope.type ='سليم'
                    }
                    if(index === 1) {
                        $scope.type ='سكري نوع ١'
                    }
                    if(index === 2) {
                        $scope.type ='سكري نوع ٢'
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };


        $scope.saveData = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'تاكيد الاختيارات',
                template: "هل تريد تأكيد البيانات المختارة؟",
                cancelText: 'لا',
                okText:'نعم'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    window.localStorage.setItem("uAge", $scope.age);
                    window.localStorage.setItem("uWeight",$scope.weight);
                    window.localStorage.setItem("uType", $scope.type);
                    $state.go('app.profile');
                } else {
                    console.log('رجوع');
                }
            });
        };

        $scope.removesomedata = function(){
            $scope.age= "";
            $scope.weight = "";
            $scope.type="";
        };
    })


    .controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,
                                    $state, $ionicPlatform, $location, $ionicHistory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();


})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup, $ionicPlatform,$state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);


    var readingsData = JSON.parse(window.localStorage.getItem("Readings"));
    console.log(readingsData);

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    // When button is clicked, the popup will be shown...
    $scope.showConfirm = function(entry) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'تاكيد الادخال',
            template: 'هل القراءة الأخيرة للسكر هي ' + entry + '؟',
            cancelText: 'لا',
            okText:'نعم'
        });

        confirmPopup.then(function(res) {
            if(res) {
                var date = new Date();
                var h = date.getHours();
                var m = date.getMinutes();
                var day = date.getDate();
                var month = date.getMonth() +1;
                var year = date.getFullYear();

                m = pad(m);

                if (readingsData == null)
                    readingsData = [{"reading": entry, "date":day+"/"+month+"/"+year, "time": h + ":" + m}];
                else
                    readingsData.push({"reading": entry, "date":day+"/"+month+"/"+year, "time": h + ":" + m});
                console.log(readingsData);
                window.localStorage.setItem("Readings", JSON.stringify(readingsData));
                $state.go('app.statistics')

            } else {
                console.log("Canceled");
            }
        });

    };


})

    .controller('GalleryCtrl', function($scope,$window, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });
        $scope.NClick=JSON.parse(window.localStorage.getItem("NClick"));
        $scope.MClick=JSON.parse(window.localStorage.getItem("MClick"));
        $scope.N2Click=JSON.parse(window.localStorage.getItem("N2Click"));
        $scope.news=JSON.parse(window.localStorage.getItem("news"));
        $scope.maqal=JSON.parse(window.localStorage.getItem("maqal"));
        $scope.nasaeh=JSON.parse(window.localStorage.getItem("nasaeh"));


        $scope.EnableN = function () {
            $window.location.reload(true);
            var clean = null;
            window.localStorage.setItem("NClick", JSON.stringify(clean));
            window.localStorage.setItem("MClick", JSON.stringify(clean));
            window.localStorage.setItem("N2Click", JSON.stringify(clean));
            $scope.NClick=JSON.parse(window.localStorage.getItem("NClick"));
            window.localStorage.setItem("news", JSON.stringify("1"));
            window.localStorage.setItem("maqal", JSON.stringify("2"));
            window.localStorage.setItem("nasaeh", JSON.stringify("2"));
            $scope.nasaeh=JSON.parse(window.localStorage.getItem("nasaeh"));
            $scope.maqal=JSON.parse(window.localStorage.getItem("maqal"));
            $scope.news=JSON.parse(window.localStorage.getItem("news"));
        };

        $scope.EnableM = function () {
            $window.location.reload(true);
            var clean = null;
            window.localStorage.setItem("NClick", JSON.stringify(clean));
            window.localStorage.setItem("MClick", JSON.stringify(clean));
            window.localStorage.setItem("N2Click", JSON.stringify(clean));
            $scope.MClick=JSON.parse(window.localStorage.getItem("MClick"));
            window.localStorage.setItem("news", JSON.stringify("2"));
            window.localStorage.setItem("maqal", JSON.stringify("1"));
            window.localStorage.setItem("nasaeh", JSON.stringify("2"));
            $scope.nasaeh=JSON.parse(window.localStorage.getItem("nasaeh"));
            $scope.maqal=JSON.parse(window.localStorage.getItem("maqal"));
            $scope.news=JSON.parse(window.localStorage.getItem("news"));
        };

        $scope.EnableN2 = function () {
            $window.location.reload(true);
            var clean = null;
            window.localStorage.setItem("NClick", JSON.stringify(clean));
            window.localStorage.setItem("MClick", JSON.stringify(clean));
            window.localStorage.setItem("N2Click", JSON.stringify(clean));
            $scope.N2Click=JSON.parse(window.localStorage.getItem("N2Click"));
            window.localStorage.setItem("news", JSON.stringify("2"));
            window.localStorage.setItem("maqal", JSON.stringify("2"));
            window.localStorage.setItem("nasaeh", JSON.stringify("1"));
            $scope.nasaeh=JSON.parse(window.localStorage.getItem("nasaeh"));
            $scope.maqal=JSON.parse(window.localStorage.getItem("maqal"));
            $scope.news=JSON.parse(window.localStorage.getItem("news"));
        };

        $scope.News = [

            {
                Date: "2017-03-14",
                Image: "img/1.jpg",
                Link: "https://www.altibbi.com/اخبار-طبية/مرض-السكري/تصريح-الغذاء-والدواء-بشان-دواء-انفوكانا-و-انفوكامت-6683",
                Text:'نبَهت الإدارة العامة للغذاء والدواء الأمريكية بخطر بتر القدم خاصة أصابع القدم لمرضى السكري الذين يستخدمون دواء canagliflozin (Invokana, Invokamet). كاناغليفلوزين (انفوكانا وانفوكامت) بعد القيام بتجارب سريرية ولكن لا زال التحقيق والبحث بآمنية الدواء جاري. على المرضى: عدم التوقف عن أخذ أي دواء للسكري قبل سؤال طبيبهم لأن ذلك قد يؤدي لمضاعفات خطيرة مثل فقدان البصر، تلف الأعصاب، أمراض القلب و الكلى. بالتالي يجب على المرضى الذين يستخدمون دواء انفوكانا أو انفوكامت ابلاغ طبيبهم فوراً بحال الشعور بأي ألم او تقرحات او التهاب في القدم. على الأطباء: على الطبيب مراقبة المرضى جيداً للتأكد من عدم حدوث أي أعراض او علامات خطرة و التأكيد على المرضى بابلاغهم بأي شيء جديد. تعتمد آلية عمل هذا الدواء على تثبيط نواقل الصوديوم والجلوكوز"SGLT2" وبالتالي افراز السكر بالبول عن طريق الكلى. Canagliflozin هي التركيبة العلمية للدواء ويتوفر بالاسم التجاري انفوكانا و يتوفر أيضاً مع مساعد السكري ميتفورمين بالاسم التجاري انفوكامت وهذا الدواء يستخدم إلى جانب النظام الغذائي الصحي و التمارين الرياضية لتخفيض مستوى السكر بالدم لمرضى السكري من النوع الثاني. بالنسبة لاحتمالية حدوث بتر القدم خلال العلاج : 7 من أصل 1000 مريض تم علاجهم بـ100 مغم Canagliflozin يومياً 5 من اصل 1000 مريض تم علاجهم بـ300 مغم Canagliflozin يومياً 3 من اصل 1000 مريض تم علاجهم بدواء وهمي Placebo "لا يحتوي على مادة فعَالة" وبينت الادارة العامة للغذاء والدواء للعامة بأنها ستستمر بالتحقيق حول هذا الأمر وستفيدهم بأي تطورات وتطالب المرضى ومقدمي الرعاية الصحية بالإبلاغ عن أي حالات مشابهة.',
                Title: "تصريح الغذاء والدواء بشأن دواء انفوكانا و انفوكامت"
            },

            {
                Date: "2016-11-09",
                Image: "img/2.jpg",
                Link: "https://www.altibbi.com/اخبار-طبية/مرض-السكري/كيف-تزداد-احتمالية-اصابة-المولود-بالسكري-6668",
                Text: ["أخبار الطبي-عمّان", "- تشير دراسة جديدة عُرضت نتائجها الأولية في المؤتمر السنوي لجمعية الغدد الصماء في المملكة المتحدة أنّ الأطفال الذين يولدون لأمهات كنّ يعانين من نقص فيتامين ب١٢ خلال فترة الحمل قد يكونوا أكثر عرضة لخطر الإصابة بالنوع الثاني من مرض السكري والاضطرابات الأيضية الأخرى. (للمزيد: الحمل ومرض السكري)", "- سَيانُوكُوبالاَمين والمعروف بفيتامين ب١٢ هو فيتامين قابل للذوبان في الماء، وهو ذو أهمية للعديد من الوظائف الحيوية؛ فهو ضروري للنمو وتكاثر الخلية، وصناعة الحمض النووي, وله دور في تشكيل الدم و عمل الجهاز العصبي، و يوجد بشكل طبيعي في المنتجات الحيوانية مثل الحليب والبيض والجبن واللحوم والدواجن والأسماك. كما يتوفر أيضا كمكمل غذائي. حيث أنّ الجرعة اليومية الموصى بها لفيتامين ب١٢ بالنسبة للأفراد من عمر 14 و أكثر هي 2.4 ميكروغرام، أما للمرأه الحامل فالجرعة اليومية الموصى بها هي 2.6 ميكروغرام، و2.8 ميكروغرام للمرأة المرضع. (للمزيد: الفيتامينات)", "- أشارت دراسات سابقة إلى أن الأمهات الذين يمتلكون مستويات منخفضة من فيتامين ب١٢ لديهم مؤشر كتلة الجسم أعلى من غيرهم وأنّ مواليديهم يعانون من انخفاض الوزن عند الولادة وكذلك ارتفاع مستويات الكولسترول. بالإضافة إلى ذلك، فقد أظهرت هذه البحوث أنّ هؤلاء الأطفال يعانون من ارتفاع في مقاومة الانسولين في مرحلة الطفولة، أحد العوامل التي ترفع من خطر تعرضهم لمرض السكري من النوع الثاني.", "- نقص فيتامين ب١٢ في فترة الحمل قد يغير مستويات هرمون الليبتين في المولود الحديث، في هذه الدراسة افترض فريق من الباحثين في كلية الطب بجامعة وارويك الطبية بأن هذه التغييرات المرتبطة بنقص فيتامين ب١٢ قد تكون نتيجة لمستويات غير طبيعية من هرمون الليبتين، وهو هرمون تنتجه الخلايا الدهنية. وترتفع مستوياته كاستجابة لتناول الطعام، وغالباً ما يشار إليه باسم \"هرمون الشبع\".", "- وقد أظهرت الأبحاث أنّ الوزن الزائد يمكن أن يُسبب زيادة في مستويات هرمون الليبتين كاستجابة لتناول الطعام. وهذا يؤدي إلى زيادة مقاومة اللبتين، والذي قد يؤدي إلى المزيد من الإفراط في تناول الطعام، وزيادة الوزن، ومقاومة الانسولين، مما يزيد من خطر الإصابة بمرض السكري من النوع الثاني.", "- في هذه  الدراسة، قام الباحثون بتحليل 91 عينة دم أخذت من الأمهات وأطفالهن عند الولادة لتحديد مستويات فيتامين ب١٢. بالإضافة إلى ذلك، قاموا بتحليل 42 عينة من الأنسجة الدهنية للأمهات وحديثي الولادة و 83 عينة من أنسجة المشيمة.", "- وجد الباحثون أن الأطفال الذين يولدون لأمهات يعانين من نقص فيتامين ب١٢ الذي يُعرف بأنه أقل من 150 بيكومولز للتر الواحد  كان لديهم مستويات أعلى من المعتاد لهرمون  الليبتين الذي قد يزيد من خطر الإصابة بمرض السكري من النوع الثاني والاضطرابات الأيضية الأخرى. (للمزيد: التعايش مع سكري الأطفال)", "- في الوقت الحاضر، فإن الباحثين غير قادرين على تحديد تفاصيل كيف ولماذا نجد زيادة في هرمون الليبتين في الأطفال الذين يولدون لأمهات يعانون من نقص في فيتامين ب١٢، ولكن لديهم بعض النظريات؛ إما أنّ انخفاض فيتامين ب١٢ يؤدي إلى تراكم الدهون في الجنين، وهذا يؤدي إلى زيادة هرمون الليبتين، أو انخفاض فيتامين ب١٢ يسبب تغيرات كيميائية في جينات المشيمة التي تنتج هرمون الليبتين، مما يؤدي إلى إنتاج الهرمون بصورة أكبر، ويأمل الباحثون مع إجراء المزيد من الدراسات إلى إثبات صحة شكوكهم. حيث إذا تم  تأكيد النتائج التي توصلوا إليها، فان الجرعات الموصى بها حالياً من فيتامين ب١٢ أثناء فترة الحمل قد تحتاج إلى تغيير.", "إقرأ أيضاً:", "الحمية الغذائية المناسبة لمرضى سكري الأطفال", "سكري الأطفال خطر يهدد استقرار وحياة أسره بأكملها", "السكري عند الأطفال", "تغذية أطفال مرضى السكري", "المصدر: ", "medicalnewstoday: Low vitamin B12 in pregnancy may raise offspring's diabetes risk"],
                Title: "كيف تزداد إحتمالية إصابة المولود بالسكري؟"
            },

            {
                Date: "2015-05-04",
                Image: "img/3.jpg",
                Link: "https://www.altibbi.com/اخبار-طبية/مرض-السكري/فريق-طبي-اردني-يعالج-السكري-بالخلايا-الجذعية-5893",
                Text: 'قبل التعرف على هذا الاكتشاف يجب معرفة أين تكمن المشكلة التي سببت هذا المرض للتركيز في العلاج على حل هذه المشكلة . تعمل خلايا بيتا في البنكرياس السليم على إفراز الأنسولين الذي يتحكم في مستوى السكر في الدم، ويتم الحفاظ علي خلايا بيتا عن طريق الإنقسام المستمر فإذا فُقِدَ هذا التوازن يتطور الأمر إلى الإصابة بمرض السكري. قام فريق طبي أردني ترأسه رئيس فريق الجروح المزمنة في الخدمات الطبية الملكية العميد الدكتور حازم حبوب -الذي أجرى عملية زراعة الخلايا الجذعية- بعد أبحاث استمرت لسنتين بحقن الشعيرات الدقيقة التي تغذي البنكرياس بالخلايا الجذعية مباشرةً عن طريق القسطرة من غير جراحة لأربع مرضى : ثلاثة رجال وطفلة عمرها 13 سنة، كلهم يعانون من السكري ويتناولون جرعات من الإنسولين بمعدل ثلاث جرعات يوميا تراوحت بين عشرين وثمانين وحدة بعد الزراعة تم إعادة إفراز الانسولين من خلايا بيتا في البنكرياس و هذا قاد لاستغناء المرضى عن الإنسولين . أوضح الدكتور حبوب أن إعادة إحياء البنكرياس دون آثار جانبية يعطي أملاً لمرضى السكري من النوع الأول الذي يعاني منه غالباً الأطفال. تعتمد الطريقة على نقطتين أساسيتين: الأولى إيقاف الهجوم المناعي على الخلايا المفرزة للإنسولين (بيتا)، والثانية زراعة خلايا جذعية في البنكرياس لتصنيع خلايا بيتا جديدة مفرزة للإنسولين، وذلك باستخلاص خلايا من المريض نفسه وتنقيتها بهدف الحصول على خلايا نقية". بعد متابعة استمرّت من 22 إلى 51 شهر لم تظهر أي أعراض جانبية على المرضى و ثلاثة توقفوا عن تناول الإنسولين تماما بعد ستة أشهر من الزراعة، وما زال الرابع قيد المتابعة و انخفض معدل السكر التراكمي في دمائهم (HbA1c) انخفاض ملموس حيث وصل إلى 7.',
                Title: "فريق طبي أردني يعالج السكري بالخلايا الجذعية"
            }

        ];

        $scope.Maqal = [

            {
                Date: "2016-03-28",
                Image: "https://www.altibbi.com/global/img/website/xlarge/56f9382e6a851article__1.png",
                Link: "https://www.altibbi.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D8%A7%D8%AD%D8%B5%D8%A7%D8%A6%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D8%B4%D8%B1%D9%82-%D8%A7%D9%84%D8%A7%D9%88%D8%B3%D8%B7-%D8%A7%D9%86%D9%81%D9%88%D8%AC%D8%B1%D8%A7%D9%81%D9%8A%D9%83-3438",
                Text: "سكري السكري أصبح من أضخم القضايا في الصحة العالمية للقرن الحادي و العشرين . في كل عام يزداد عدد الأشخاص الذين يعانون مع مرض السكري ومن مضاعفاته التي تؤثر سلباً على جودة الحياة. ولتعريف السكري بشكل بسيط فهو مرض مزمن ينتج عن عدم انتاج الجسم كميات كافية من هرمون الانسولين. يتم تشخيص السكري بمراقبة مستويات الغلوكوز في الدم حيث يلاحظ ارتفاعها لدى المصاب. يفرز هرمون الانسولين من البنكرياس حيث يقوم بنقل الغلوكوز من الدم إلى خلايا الجسم لاستهلاكه كطاقة. و أي نقص بفعالية أو انعدام للإنسولين ينتج عنه بقاء الغلوكوز في الدم ومع مرور الوقت ارتفاع الغلوكوز يسبب تلف في أنسجة الجسم وحدوث مضاعفات خطيرة. احصائيات حسب آخر احصائيات أجريت في عام 2015 تبين وجود 415 مليون بالغ يعاني من السكري و318 مليون آخرين لديهم عدم تحمل الغلوكوز مما يرشحهم لخطر الاصابة بالسكري مستقبلاً. 35.4 مليون بالغ من الفئة العمرية بين (20-79 عام) مصاب بالسكري في الشرق الأوسط و شمال افريقيا. 40.6% منهم لم يتم تشخيصهم بعد. النسبة الانتشارية حسب الدولة أكثر الدول انتشاراً للسكري السعودية 17.6% ثم الكويت 14.3% الدولة التي لديها أكبر عدد من مرضى السكري هي مصر حيث يقدر وجود 7.8 مليون مصاب. ويتوقع أن يتضاعف العدد بحلول عام 2040 ليصل إلى 72.1 مليون مريض. السكري النوع الأول أما الكويت والمملكة العربية السعودية فاحتلوا أعلى معدل إصابات سنوية للسكري من النوع الأول عند الأطفال حيث تظهر 37.1 حالة جديدة من كل 100.000 مولود في الكويت و 31.4 في المملكة العربية السعودية و كعدد أطفال مصابين بالسكري النوع الأول فكانت السعودية في المرتبة الأولى بالمقارنة مع المناطق الأخرى. للمزيد: السكري عند الأطفال الوفيات أما عن الوفيات فالسكري كان المسؤول عن وفاة 342.000 شخص خلال عام 2015 نصفهم أقل من عمر الستين.",
                Title: "احصائيات السكري في الشرق الأوسط انفوجرافيك"
            },

            {
                Date: "2015-02-15",
                Image: "https://www.altibbi.com/global/img/website/xlarge/57ff2d5d51329article_2868_1.jpg",
                Link: "https://www.altibbi.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D9%81%D9%8A-%D8%AA%D8%BA%D8%B0%D9%8A%D8%A9-%D9%85%D8%B1%D8%B6%D9%89-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A-2868",
                Text: "إن مرض السكري من أكثر الأمراض التي يمكن السيطرة عليها وذلك باتباع نمط حياة صحي يشمل الغذاء السليم وممارسة النشاط الرياضي والمواظبة على العلاج مما يساعد في ضبط معدل السكر في الدم وبالتالي التقليل من المضاعفات التي تنتج على المدى البعيد. نصائح غذائية لمرضى السكري: • ينصح بتقسيم الوجبات بحيث تكون صغيرة ومتعددة وتجنب تناول كمية كبيرة من الطعام في الوجبة الواحدة. • تناول النشويات كالخبز والأرز والمعكرونة والفاكهة بكميات معتدلة لأن لها تأثير مباشر على سكر الدم. • ينصح بالإكثار من تناول الخضار وجعل طبق السلطة رئيسي في الوجبة لأنها تمد الجسم بالعناصر الغذائية الضرورية بالإضافة إلى أنها تضبط مستوى سكر الدم. • التقليل قدر الإمكان من تناول السكريات والحلويات أو تناولها ضمن الكمية المسموحة . • شرب لا يقل عن 8 أكواب من الماء يومياً. • استخدام طريقة الشوي أو السلق أو الطبخ بالبخار عند اعداد الطعام وتجنب المقالي قدر الإمكان. • تناول المنتجات القليلة الدسم. • من الأفضل التقليل من اللحوم الحمراء واستبدالها بالأسماك والدجاج وتناول البقول كمصدر للبروتين . • استبدال الخبز الأبيض بالأسمر وتناول الحبوب الكاملة (الشوفان، القمح الكامل، الأرز البني، الشعير) والفواكة الطازجة بدلاً من العصائرلأن هذه الأغذية غنية بالألياف التي تحافظ على مستوى السكر في الدم ضمن المعدل الطبيعي. • الإحتفاظ ببعض الحلوى أو السكاكر عند الخروج من المنزل لتناولها عند حدوث انخفاض مفاجئ في مستوى السكر. • ينصح بتخفيض الوزن إذا كان الشخص يعاني من السمنة. • زيادة النشاط الرياضي قدر الإمكان. • عدم الإنصياع إلى الإشاعات التي تقول بأن هذه الوصفة أو الأعشاب تعالج السكري بشكل تام دون الحاجة إلى استخدام الإنسولين وبالتالي التوقف عنه دون الرجوع إلى الطبيب، كتناول العسل أو التمر بكميات كبيرة، فهذه الأمور تؤدي إلى حدوث مضاعفات خطيرة وربما إلى الوفاة لا سمح الله. • المحليات الصناعية الموافق عليها من قبل هيئة الغذاء والدواء (FDA) والتي يمكن لمرضى السكري استخدامها بدلاً من السكر العادي (ولا ينصح بالإفراط في تناولها) : 1- السكارين. 2- الأسبارتام. 3- Acesulfame-K 4- سوكرلوز والنيوتام. • وأخيراً يجب فحص مستوى السكر في الدم بشكل دوري وتسجيل القراءات والمراجعة بها عند الطبيب لمعرفة مدى السيطرة على مستوى سكر الدم.",
                Title: "نصائح في تغذية مرضى السكري"
            },

            {
                Date: "2014-08-03",
                Image: "https://www.altibbi.com/global/img/website/xlarge/570e4a3419ff9article_2544_1.png",
                Link: "https://www.altibbi.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D9%85%D8%A7%D8%B0%D8%A7-%D9%86%D8%B9%D8%B7%D9%8A-%D9%85%D8%B1%D9%8A%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A-%D9%81%D9%8A-%D8%AD%D8%A7%D9%84%D8%A9-%D8%A7%D9%86%D8%AE%D9%81%D8%A7%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1-2544",
                Text: ' يعد مرض السكري من أكثر الأمراض إنتشارا في العالم، تقسم منظمة الصحة العالمية السكري إلى ثلاثة أنماط رئيسية وهي: سكري النمط الأول و سكري النمط الثاني وسكري الحوامل. وكل نمط له أسباب وأماكن انتشار في العالم. ولكن تتشابه كل أنماط السكري في أن سببها هو عدم إنتاج كمية كافية من لذلك يجب التركيز على ممارسة التمارين الرياضية و تنازل الطعام الصحي بكميات معتدلة. لإكتشاف مرض السكري هناك العديد من الأعراض التي تدل على زيادة نسبكة السكر في الدم كالزيادة في كمية التبول وإنخفاض الوزن و إضطرابات في النظر، فالإرتفاع المزمن للسكر في الدم يتسبب في خلل وظيفي دائم وفشل في أجزاء الجسم المختلفة إذا لم يتم معالجته فورا. وفي هذا السياق، تتساءل نجوان حمد ، أخصائية التغذية على تخصص التغذية و الصحة عبر وسائل التواصل الإجتماعي على بيت.كوم قائلة: "ماذا نعطي مريض السكري في حالة إنخفاض السكر وفقدان الوعي؟" ردا على هذا السؤال تجيب سارة الفاضلي، قائلة: " انخفاض السكر في الدم المؤدي لفقدان الوعي قد يؤدي لسكتة دماغية و من ثم اهمية حقن الجلوكوز و كإجراء اسعافي وضع السكر تحت اللسان" كذلك يرى إبراهيم ياسين، فيقول مجيب على السؤال: " لا بد ان نعطى له سكر سواء محلول او نعطى له سكر فى الفم". أما موسى طامشة، يعتقد بأن من الضروري حقنه بالوريد بمحلول الجلوكوز، فيقول : " في مثل هذه الحالة الطارئة، إذا كان حقنه وريدا بمحلول الكلوكوز المركز بنسبة 10% أو30% أو غيرهما من نسبة التركيز، وإلا اعطائه ماء مع سكر و ان كان غائبا عن الوعي يوضع السكر تحت لسانه ، ألى حين نقله الى قسم الطوارئ. أما لمى خالد، إخصائية العلاج الطبيعي، فتقول مجيبة عن السؤال: " كحل مبدئي سريع ، ملعقة من السكر مع كوب ماء أو عصير محلى". تختلف الإجابات لكن ذهبت جميع الإجابات الى أن مرض السكري لا يشفى لكن يتم التركيز في علاجه على محاولة التقليل من المتاعب قصيرة أو طويلة المدى التي يمكن أن يسببها المرض. ويوجد دور استثنائي وهام لمعرفة المريض بالمرض والتغذية الجيدة والنشاط البدني المعتدل ومراقبة المريض لمستوى غلوكوز دمه بهدف الحفاظ على مستويات غلوكوز الدم في المدى القريب وحتى البعيد في النطاق المقبول. ويقلل التضبيط الدقيق من مخاطر المضاعفات بعيدة المدى.',
                Title: "ماذا نعطي مريض السكري في حالة انخفاض السكر ؟"
            },

        ];

        $scope.nasa2h = [

            {

                Image: "https://www.altibbi.com/global/img/website/xlarge/diabetes1_3810_advice_76081.png",
                Link: "https://www.altibbi.com/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D8%B7-%D9%85%D8%B1%D9%8A%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A-%D9%84%D8%A7-%D9%8A%D8%AE%D8%AA%D9%84%D9%81-%D9%83%D8%AB%D9%8A%D8%B1%D8%A7-%D8%B9%D9%86-%D8%A7%D9%84%D8%B7-%D8%A7%D9%84%D8%B5%D8%AD%D9%8A-%D8%A7%D9%84%D9%85%D8%AA%D9%88%D8%A7%D8%B2%D9%86-%D9%81%D9%84%D8%A7-3810",
                Text: "طعام مريض السكري لا يختلف كثيرا عن الطعام الصحي المتوازن؛ فلا يجب أن يحرم المريض نفسه من تناول الطعام بل يجب عليه وبكل بساطة أن يقلل من كمية النشويات والسكريات والدهون، ويكثر من تناول الخضراوات مع ضرورة تناول كمية من البروتين من اللحوم والبقوليات ",
                Title: "غذاء مرضى السكري"
            },

            {
                Image: "https://www.altibbi.com/global/img/website/xlarge/diabetes1_3659_advice_65558.jpg",
                Link: "https://www.altibbi.com/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D9%8A%D9%85%D9%83%D9%86-%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%8A%D8%B4-%D9%85%D8%B9-%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%89-%D8%A8%D8%AA%D9%86%D8%A7%D9%88%D9%84-%D8%A7%D9%84%D8%AF%D9%88%D8%A7%D8%A1-%D9%88%D8%AA%D9%86%D8%B8%D9%8A%D9%85-3659",
                Text: "يمكن التعايش مع مرض السكرى بتناول الدواء وتنظيم الغذاء. و لكن اهمال ذلك قد يؤثر على الكليتين وينتهى بالفشل الكلوى وخاصة في وجود التهابات . كما انه يؤثر على أعصاب الأطراف والمثانة ويسبب المثانة العصبية . كما يؤدى للضعف الجنسى للرجال و اعتلال شبكية العين للجنسين",
                Title: "مرض السكرى وأمراض المسالك البولية"
            },

            {
                Image: "https://www.altibbi.com/global/img/website/xlarge/fruit_3611_advice_44166.jpg",
                Link: "https://www.altibbi.com/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D8%AA%D9%86%D8%A7%D9%88%D9%84-%D8%A7%D9%84%D9%81%D9%88%D8%A7%D9%83%D9%87-%D8%A7%D9%84%D9%85%D8%B3%D9%85%D9%88%D8%AD-%D8%A8%D9%87%D8%A7-%D8%AB%D9%85%D8%B1%D8%A9-%D8%A7%D9%88-%D8%A7%D8%AB%D9%86%D8%AA%D9%8A%D9%86-%D8%B3%D9%8A%D9%83%D9%88%D9%86-3611",
                Text: "تناول الفواكه المسموح بها ثمرة أو اثنتين ،،،، سيكون تأثيرها على مستوى سكر الدم ضعيف للغاية و لا تشرب الفواكه على شكل عصير ،،، و لا تأكل الكومبوت ،،، أو الفواكه المعلبة ،،، لان سعراتها الحرارية أعلى و كمية السكر التى تطلقها أكبر",
                Title: "الفواكه و السكرى"
            }
        ];

        $scope.ShowN = function (Tracker) {
            $window.location.reload(true);
            console.log("trac" +Tracker);
            console.log($scope.News[Tracker].Image);
            window.localStorage.setItem("NClick", JSON.stringify(Tracker));
            $scope.NClick=JSON.parse(window.localStorage.getItem("NClick"));
            window.localStorage.setItem("news", JSON.stringify("2"));
            $scope.news=JSON.parse(window.localStorage.getItem("news"));

        };

        $scope.ShowM = function (Tracker) {
            $window.location.reload(true);
            console.log("trac" +Tracker);
            console.log($scope.News[Tracker].Image);
            window.localStorage.setItem("MClick", JSON.stringify(Tracker));
            $scope.MClick=JSON.parse(window.localStorage.getItem("MClick"));
            window.localStorage.setItem("maqal", JSON.stringify("2"));
            $scope.news=JSON.parse(window.localStorage.getItem("maqal"));

        };

        $scope.ShowN2 = function (Tracker) {
            $window.location.reload(true);
            console.log("trac" +Tracker);
            console.log($scope.News[Tracker].Image);
            window.localStorage.setItem("N2Click", JSON.stringify(Tracker));
            $scope.N2Click=JSON.parse(window.localStorage.getItem("N2Click"));
            window.localStorage.setItem("nasaeh", JSON.stringify("2"));
            $scope.nasaeh=JSON.parse(window.localStorage.getItem("nasaeh"));

        };

        $scope.NClick=JSON.parse(window.localStorage.getItem("NClick"));
        $scope.MClick=JSON.parse(window.localStorage.getItem("MClick"));
        $scope.N2Click=JSON.parse(window.localStorage.getItem("N2Click"));

    })


    .controller('statisticsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$rootScope) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

        $scope.w = window.innerWidth;
        $scope.w = $scope.w *90/100 ;
        $scope.h = $scope.w* 3/4;
        $scope.w = $scope.w + "px";
        $scope.h = $scope.h +"px";

        // console.log($scope.w);



        $scope.readingsData = JSON.parse(window.localStorage.getItem("Readings"));
        if ($scope.readingsData != null )
            $scope.readingsData = $scope.readingsData.reverse();
        else
            $scope.readingsData = 0;
        console.log($scope.readingsData);


        $scope.removeItem = function (index) {
            $scope.readingsData.splice(index,1);
            $scope.readingsData = $scope.readingsData.reverse();
            window.localStorage.setItem("Readings", JSON.stringify($scope.readingsData));
            $scope.readingsData = $scope.readingsData.reverse();
            console.log($scope.readingsData);
            draw();
        }

        draw();


        function draw () {

            var xValues = [];
            for (var i = 0; i < $scope.readingsData.length; i++) {
                    var tmp = $scope.readingsData[i];

                xValues.push(tmp.date.split('/')[0] + "/" + tmp.date.split('/')[1] +
                    "<br>" + tmp.time);

            }


            var yValues = [];
            for (var i = 0; i < $scope.readingsData.length; i++) {
                var tmp = $scope.readingsData[i];
                // console.log(tmp.reading);
                if (tmp.reading == "عالي جدا") yValues.push(5);
                else if (tmp.reading == "عالي") yValues.push(4);
                else if (tmp.reading == "متوسط") yValues.push(3);
                else if (tmp.reading == "منخفض") yValues.push(2);
                else yValues.push(1);
            }

            // console.log(yValues);

            var trace = {
                x: [],
                y: [],
                marker: {
                    color: []
                },
                type: 'bar'
            };


            xValues= xValues.slice(-5);
            trace.y = yValues;
            trace.x = xValues;

            var colors = [];
            for (var i = 0; i < trace.y.length; i++) {
                if (trace.y[i] == 1) {
                    colors.push('rgba(74,135,238,1)');
                }
                else if (trace.y[i] == 2) {
                    colors.push('rgba(17,193, 243, 1)');
                }
                else if (trace.y[i] == 3) {
                    colors.push('rgba(102, 204, 51, 1)');
                }
                else if (trace.y[i] == 4) {
                    colors.push('rgba(255, 201, 00, 1)');
                }
                else {
                    colors.push('rgba(239, 78, 58, 1)');
                }
            }
            trace.marker.color = colors;

            var data = [trace];

            var layout = {
                title: "قراءات مستوى السكر",
                barmode:'group',
                yaxis: {range: [0, 5],
                    showline: true,
                    autotick: true,
                    ticks: 5,
                    showticklabels: false,
                    tickvals : ['ff', 'aa','vb','wq'],
                    ticktext: ['zz', 'xx','c','w']
                },
                xaxis: {autorange: 'reversed'}

            };
            Plotly.newPlot('myDiv2', data, layout);
        }
    })


    .controller('FoodCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $rootScope,$ionicPopup) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item '
    });

    $scope.w = window.innerWidth;
    $scope.w = $scope.w *90/100 ;
    $scope.h = $scope.w* 3/4;
    $scope.w = $scope.w + "px";
    $scope.h2 = $scope.h - 45 + "px";
    $scope.h = $scope.h +"px";

    // console.log($scope.w);
    // console.log($scope.h);
    // console.log($scope.h2);

    $scope.listdata = ["المطبخ الخليجي","المطبخ الشامي","المطبخ الاجنبي","خضراوات وفواكه"];

    $scope.showList = function(){
        var listPopup = $ionicPopup.show({
            template: '<ion-list>'+
            '<ion-item style="direction: rtl;text-align:right" ng-repeat="item in listdata" ng-click="exit(item)">'+
            '{{item}}'+
            '</ion-item>'+ '</ion-list>',

            title: 'قائمة المطابخ',
            scope: $scope,
            buttons: [
                { text: 'الغاء الاختيار' },
            ]
        });

        $scope.exit =  function (item) {
            listPopup.close();
            $scope.picLabel =  item;
            // console.log(item);

            switch(item) {
                case "المطبخ الخليجي":
                    $rootScope.foodType = [
                        {model : "مندي لحم", increase : 2, carbs: 200},
                        {model : "هريس", increase : 2, carbs: 200},
                        {model : "مدفون دجاج", increase : 2, carbs: 200}
                    ];
                    $scope.kitchenPic = "images/khal.jpg";
                    $rootScope.foodPic ="images/mandi.jpg";
                    $scope.picLabel2 = $rootScope.foodChosen = "مندي لحم";

                    break;
                case "المطبخ الشامي":
                    $rootScope.foodType = [
                        {model : "كبة لبنية", increase : 1, carbs: 200},
                        {model : "ورق عنب", increase : 1, carbs: 200},
                        {model : "محشي كوسا", increase : 2, carbs: 200}
                    ];
                    $scope.kitchenPic = "images/shamy.png";
                    $rootScope.foodPic ="images/kobeh.png";
                    $scope.picLabel2 = $rootScope.foodChosen ="كبة لبنية";
                    break;
                case "المطبخ الاجنبي":
                    $rootScope.foodType = [
                        {model : "باستا", increase : 3, carbs: 200},
                        {model : "بيتزا", increase : 2, carbs: 200},
                        {model : "ستيك لحم", increase : 1, carbs: 200}
                    ];

                    $scope.kitchenPic = "images/europe.jpg";
                    $rootScope.foodPic ="images/pasta.jpg";
                    $scope.picLabel2 = $rootScope.foodChosen = "باستا";

                    break;
                default:
                    $rootScope.foodType = [
                        {model: "بطاطا", increase : 3, carbs: 200},
                        {model: "موز", increase : 2, carbs: 200},
                        {model: "برتقال", increase : 1, carbs: 200}
                    ];
                    $scope.kitchenPic = "images/fwaka.JPG";
                    $rootScope.foodPic ="images/potato.jpg";
                    $scope.picLabel2 = $rootScope.foodChosen = "بطاطا";
            }
        }
    }




    $scope.showList2 = function(){
        var listPopup = $ionicPopup.show({
            template: '<ion-list>'+
            '<ion-item style="direction: rtl;text-align:right" ng-repeat="item in foodType" ng-click="exit(item)">'+
            '{{item.model}}'+
            '</ion-item>'+ '</ion-list>',

            title: 'قائمة الأطعمة',
            scope: $scope,
            buttons: [
                { text: 'الغاء الاختيار' },
            ]
        });

        $scope.exit =  function (item) {
            listPopup.close();
            $scope.picLabel2 = $rootScope.foodChosen = item.model;
            // console.log(item);
            $rootScope.foodPic ="images/mandi.jpg";

            if (item.model == "مندي لحم"){$rootScope.foodPic ="images/mandi.jpg";}
            else if (item.model == "هريس"){$rootScope.foodPic ="images/hrees.jpg";}
            else if (item.model == "مدفون دجاج"){$rootScope.foodPic ="images/madfoon.jpg";}
            else if (item.model == "كبة لبنية"){$rootScope.foodPic ="images/kobeh.png";}
            else if (item.model == "ورق عنب"){$rootScope.foodPic ="images/waraq.jpg";}
            else if (item.model == "محشي كوسا"){$rootScope.foodPic = "images/mehshy.jpg";}
            else if (item.model == "باستا"){$rootScope.foodPic ="images/pasta.jpg";}
            else if (item.model == "بيتزا"){$rootScope.foodPic ="images/pizza.jpg";}
            else if (item.model == "ستيك لحم"){$rootScope.foodPic ="images/steak.jpg";}
            else if (item.model == "بطاطا"){$rootScope.foodPic ="images/potato.jpg";}
            else if (item.model == "موز"){$rootScope.foodPic ="images/banana.jpg";}
            else if (item.model == "برتقال"){$rootScope.foodPic ="images/orange.jpg";}
        }
    }


    $scope.kitchen = "المطبخ الخليجي";
    $scope.food = "مندي لحم";
    $rootScope.foodType = [
        {model : "مندي لحم", increase : 2, carbs: 200},
        {model : "هريس", increase : 2, carbs: 200},
        {model : "مدفون دجاج", increase : 2, carbs: 200}
    ];
    $scope.kitchenPic = "images/khal.jpg";
    $rootScope.foodPic ="images/mandi.jpg";
    $scope.picLabel="المطبخ الخليجي";
    $scope.picLabel2="مندي لحم";
    $rootScope.foodChosen = "مندي لحم";



})


    .controller('FoodCtrl2', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $rootScope) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

        $scope.w = window.innerWidth;
        $scope.w = $scope.w *90/100 ;
        $scope.h = $scope.w* 4/5;
        $scope.w = $scope.w + "px";
        $scope.h2 = $scope.h - 45 + "px";
        $scope.h = $scope.h +"px";
        $scope.y = "80%";
        $scope.x = "80%";
        $scope.platePicLabel = "صحن وسط(300 جرام تقريبا)";
        $scope.platePic = "images/plate1.jpg";


        $scope.plateChanged = function (plate) {

            // console.log(plate);
            if (plate == 0) {
                $scope.platePicLabel = "صحن صغير (200 جرام تقريبا)";
                $scope.platePic = "images/plate1.jpg";
                $scope.y = "60%";
                // $scope.x = "60%";


            }
            else if (plate == 1) {
                $scope.platePicLabel = "صحن وسط (300 جرام تقريبا)";
                $scope.platePic = "images/plate1.jpg";
                $scope.y = "80%";
                // $scope.x = "80%";

            }
            else {
                $scope.platePicLabel = "صحن كبير (400 جرام تقريبا)";
                $scope.platePic = "images/plate1.jpg";
                $scope.y = "100%";
                // $scope.x = "100%";

            }
        }

        var readingsData = JSON.parse(window.localStorage.getItem("Readings"));

        $scope.lastReading = readingsData[Object.keys(readingsData).pop()].reading;

        var currentLevel;
        if($scope.lastReading ==  "عالي جدا" ){currentLevel=5}
        else if ($scope.lastReading == "عالي"){currentLevel=4}
        else if ($scope.lastReading == "متوسط"){currentLevel=3}
        else if ($scope.lastReading == "منخفض" ){currentLevel=2}
        else {currentLevel =1}
        console.log("current level", currentLevel)

        var found = $rootScope.foodType.filter(function(item) { return item.model === $rootScope.foodChosen; });
        console.log(found);
        var nextLevel = currentLevel + found[0].increase;
        console.log("increase",found[0] .increase);

        if(found[0].increase == 1)
            $scope.info = "منخفض"
        else if(found[0].increase == 2)
            $scope.info = "متوسط"
        else
            $scope.info = "عالي"


        if(nextLevel >= 5){$scope.result ="عالي جدا"}
        else if(nextLevel == 4){$scope.result ="عالي"}
        else if(nextLevel == 3){$scope.result ="متوسط"}
        else if(nextLevel == 2){$scope.result ="منخفض"}
        else {$scope.result ="منخفض جدا"}

        console.log("nextLe", nextLevel)

        $scope.test = [];
        $scope.test.push({"nxt": $scope.result});
        console.log($scope.test)
        console.log($scope.test[0].nxt)

    })



    .controller('CustomCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$ionicPopup) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

        var readingsData = JSON.parse(window.localStorage.getItem("Readings"));
        $scope.lastReading = readingsData[Object.keys(readingsData).pop()].reading;
        var currentLevel;
        if($scope.lastReading ==  "عالي جدا" ){currentLevel=5}
        else if ($scope.lastReading == "عالي"){currentLevel=4}
        else if ($scope.lastReading == "متوسط"){currentLevel=3}
        else if ($scope.lastReading == "منخفض" ){currentLevel=2}
        else {currentLevel =1}


        $scope.volume = 250;
        $scope.ingred = "مكون";
        $scope.result = "الرجاء ادخال المكونات لحساب مستوى السكر الجديد"

        $scope.inputs = [{
             volume: $scope.volume,
             ingred: $scope.ingred
        }];

        $scope.addInput = function () {

            $scope.volume = 250;
            $scope.ingred = "مكون";

            console.log("new input");
            $scope.inputs.push({
                volume: $scope.volume,
                ingred: $scope.ingred
            });
        }

        $scope.removeInput = function (index) {
            $scope.inputs.splice(index, 1);
        }


        $scope.calculate = function () {

            $scope.result = "تناول هذه الوجبة سيرفع مستوى السكر تقريبا الى:";

            var sum = 0;
            var gIndex, carbs, gLoad, increase;

            for(var i = 0; i < $scope.inputs.length; i ++){

                if ($scope.inputs[i].ingred == "مكون"){gIndex = 0; carbs=0}
                else if ($scope.inputs[i].ingred == "معكرونة اصابع") {gIndex = 50; carbs=30.68}
                else if ($scope.inputs[i].ingred == "بصل") {gIndex = 1; carbs=16}
                else if ($scope.inputs[i].ingred == "صلصة طماطم") {gIndex =45; carbs=18.08}
                else if ($scope.inputs[i].ingred == "جبنة طبخ") {gIndex = 5; carbs=20}
                else if ($scope.inputs[i].ingred == "حليب") {gIndex = 31; carbs=4.52}
                else if ($scope.inputs[i].ingred == "طحين ابيض") {gIndex = 75; carbs=95.39}


                gLoad = gIndex * (carbs * $scope.inputs[i].volume / 100) /100;
                sum = sum + gLoad;

            }

            if(sum <=10)
                increase = 1;
            else if(sum > 10 && sum <= 20)
                increase = 2;
            else
                increase = 3;

            console.log(increase)

            var nextLevel = currentLevel + increase;

            if(nextLevel >= 5){$scope.result +=" عالي جدا"}
            else if(nextLevel == 4){$scope.result +=" عالي"}
            else if(nextLevel == 3){$scope.result +=" متوسط"}
            else if(nextLevel == 2){$scope.result+=" منخفض"}
            else {$scope.result +=" منخفض جدا"}

        }



        $scope.items = [
            // {model: "بطاطا", increase : 1, carbs: 200},
            // {model: "موز", increase : 2, carbs: 200},
            // {model: "برتقال", increase : 3, carbs: 200}
            {model: "معكرونة اصابع"},
            {model: "بصل"},
            {model: "صلصة طماطم"},
            {model: "جبنة طبخ"},
            {model: "حليب"},
            {model: "طحين ابيض"}
        ];

        $scope.showList = function(index){
            var listPopup = $ionicPopup.show({
                template: '<ion-list>'+
                '<ion-item style="direction: rtl;text-align:right" ng-repeat="item in items" ng-click="exit(item)">'+
                '{{item.model}}'+
                '</ion-item>'+ '</ion-list>',

                title: 'قائمة المقادير',
                scope: $scope,
                buttons: [
                    { text: 'الغاء الاختيار' },
                ]
            });

            $scope.exit =  function (item) {
                listPopup.close();
                $scope.inputs[index].ingred = item.model;
            }
        }


    })

    .controller('MedicineCtrl', function($scope,$window, $stateParams, $cordovaLocalNotification, $ionicPlatform, $timeout, ionicTimePicker, ionicMaterialInk, ionicMaterialMotion,  $ionicPopup, $ionicActionSheet, $cordovaCamera,$cordovaFile) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });


        $scope.InsertData = {};
        var TimeToNotify = null;

        var MedsArray = JSON.parse(window.localStorage.getItem("InsertedMeds"));



        $scope.thepic='';
        $scope.takePicture = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 800,
                targetHeight: 800,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true


            }


            $cordovaCamera.getPicture(options)
                .then(function (data) {
                    console.log('camera data: '+ angular.toJson(data));
                    window.localStorage.setItem("LatestImage", JSON.stringify(data));
                    $scope.thepic='data:image/jpeg;base64,'+data;}, function(error){
                    console.log('camera error: '+angular.toJson(data));

                });

        };

        $scope.showPopup = function(index) {
            $scope.data = {}


            var myPopup = $ionicPopup.show({
                title: $scope.Citems[index].title,
                subTitle: $scope.Citems[index].text,
                buttons: [
                    { text: 'إبقاء' }, {
                        text: 'حذف',
                        type: 'button-positive',
                        onTap: function(e) {

                            if (!$scope.data.model) {
                                //don't allow the user to close unless he enters model...
                                $scope.Citems.splice(index, 1);

                                window.localStorage.setItem("MedicineDataChosen", JSON.stringify($scope.Citems));
                                console.log(JSON.parse(window.localStorage.getItem("MedicineDataChosen")));
                            } else {
                                return $scope.data.model;
                            }
                        }
                    }
                ]
            });

            console.log("please");
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.showActionsheet1 = function(theindex1) {

            $ionicActionSheet.show({

                //titleText:'معلومات أكثر',
                buttons: [
                    // { text: '<i class="icon ion-information-circled"></i> عرض المزيد من المعلومات' },
                    { text: '<i class="icon ion-android-delete"></i> حذف من قائمتي' }
                ],
                cancelText: 'الغاء',
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);

                    if(index == 0) {
                        MedsArray.pop(index);
                        window.localStorage.setItem("InsertedMeds", JSON.stringify(MedsArray));
                        cordova.plugins.notification.local.cancel(index, function() {
                        });
                        $window.location.reload(true);

                    }

                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };

        $scope.chosen = JSON.parse(window.localStorage.getItem("MedicineDataChosen"));

        $scope.flag = JSON.parse(window.localStorage.getItem("TheFlag"));


        $scope.Add = function () {
            var newval = true;
            window.localStorage.setItem("TheFlag", JSON.stringify(newval));
            console.log(window.localStorage.setItem("TheFlag", JSON.stringify(newval)));
            $scope.flag = JSON.parse(window.localStorage.getItem("TheFlag"));
            //$window.location.reload(true);


        };



        $scope.newMedFlag=0;
        $scope.SaveNewMed = function () {
            $scope.InsertData.image = JSON.parse(window.localStorage.getItem("LatestImage"));
            $scope.newMedFlag=1;
            window.localStorage.setItem("newMedFlag", JSON.stringify($scope.newMedFlag));
            if(MedsArray==null)
                MedsArray = [{title: $scope.InsertData.medName, image: JSON.parse(window.localStorage.getItem("LatestImage")), howToUse: $scope.InsertData.howToUse}];
            else
                MedsArray.push({title: $scope.InsertData.medName, image: JSON.parse(window.localStorage.getItem("LatestImage")), howToUse: $scope.InsertData.howToUse});
            window.localStorage.setItem("InsertedMeds", JSON.stringify(MedsArray));
            //$window.location.reload(true);
            var rm = false;
            window.localStorage.setItem("TheFlag", JSON.stringify(rm));
            console.log(window.localStorage.setItem("TheFlag", JSON.stringify(rm)));
            console.log(window.localStorage.setItem("TheFlag", JSON.stringify(rm)));
            $scope.flag = JSON.parse(window.localStorage.getItem("TheFlag"));
            $window.location.reload(true);
        }
        $scope.AddedByUser = JSON.parse(window.localStorage.getItem("InsertedMeds"));
        //console.log('length: ',(JSON.parse(window.localStorage.getItem("InsertedMeds")).length));

        var ipObj1 = {
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                    console.log('Time not selected');
                } else {
                    //var selectedTime = new Date(val * 1000);
                    var selectedTime = new Date(val * 1000);
                    var todayE = new Date();
                    var calc = todayE.getTime() - todayE.getUTCHours()*3600000 - todayE.getUTCMinutes()*60000 - (todayE.getUTCSeconds()+10)*1000;
                    var NotificationTime = calc + (selectedTime.getUTCHours()-4)*3600000 + selectedTime.getUTCMinutes()*60000 + selectedTime.getUTCSeconds()*1000;
                    window.localStorage.setItem("NotificationTime", JSON.stringify(NotificationTime));
                }
            },
            inputTime: 50400,   //Optional
            format: 12,         //Optional
            step: 1,           //Optional
            setLabel: 'موافق',    //Optional
            closeLabel: 'إغلاق'
        };


        $scope.TimePicker = function () {
            ionicTimePicker.openTimePicker(ipObj1);


        };

        $ionicPlatform.ready(function () {
            $scope.scheduleDelayedNotification = function () {
                var NotfDate = new Date(JSON.parse(window.localStorage.getItem("NotificationTime")));
                $cordovaLocalNotification.schedule({
                    id: ((JSON.parse(window.localStorage.getItem("InsertedMeds")).length)),
                    title: 'موعد أخذ الدواء',
                    text: 'حان موعد أخذ الدواء التالي:'+(JSON.parse(window.localStorage.getItem("InsertedMeds")))[((JSON.parse(window.localStorage.getItem("InsertedMeds")).length)-1)].title,
                    at: NotfDate,
                    led: "FF0000"
                    //every:'day',

                }).then(function (result) {
                    console.log('Notification 2 triggered');
                });
            };
        });

    })