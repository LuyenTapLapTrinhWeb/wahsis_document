<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-bottom: 10px;">

                    <input type="file" name="file[]" id="upload_imageitem" style="  padding-top: 0px; font-size: 12px;display: none !important" onchange="readURL1(this);" accept="image/*" >



                    <div id="create_form_upload" style="display: none">

                    </div>
                    <form id="form_uploadthumb" method="POST" enctype="multipart/form-data">
                        <input type="file" name="file[]" id="upload_imageitem1" style="  padding-top: 0px; font-size: 12px;display: none !important"  >
                        <button  id="s"  style="display: none"  ></button>
                    </form>

                    <!--<img id="output" class="an" style="    height: 75px; margin: 2px;"/>
                    <!-- Ch?nh l?i -->

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"  style="height: 105px;display: inline-block;vertical-align: top;font-size: 38px;padding: 0px;padding-top: 25px;    color: #c3c3c3;" ng-click="scroll_left()"> < </div>
                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9" id="div_list_img" style="height:145px;padding-top: 5px !important; overflow-x:visible ;white-space:nowrap; overflow-y:hidden;display: inline-block;padding: 0px;">
                                <div ng-repeat="img in selected_image_list_old" style="display: inline-block">
                                    <div style="float: left; position: relative; background-image: url('http://pub.diamondisland.online/img/div-img.png'); background-size: 100% 100%;; top: -7px; margin: 0px 5px; width: 135px; height: 110px; display: flex; align-items: center">
                                        <img ng-src="{{img.img_link}}" style=" height: 86%; margin: 5px auto; display: block; max-width: 119px;"/>
                                        <img src='http://pub.diamondisland.online/img/close-button.svg'  style=" position: absolute; left: 115px; top: 5px; height: 15px;"  ng-click="xoahinh(img)">
                                    </div>
                                </div>
                                <div ng-repeat="img in selected_image_list" style="display: inline-block" >
                                    <div style="float: left; position: relative; background-image: url('http://pub.diamondisland.online/img/div-img.png'); background-size: 100% 100%;; top: -7px; margin: 0px 5px; width: 135px; height: 110px; display: flex; align-items: center">
                                        <img ng-src="{{img.img_link}}" style=" height: 86%; margin: 5px auto; display: block; max-width: 119px;"/>
                                        <img  src='http://pub.diamondisland.online/img/close-button.svg' style=" position: absolute; left: 115px; top: 5px; height: 15px;"  ng-click="xoahinh(img)">
                                    </div>
                                </div>
                                <label  for="upload_imageitem" style="display: inline-block" >
                                    <div style="float: left; position: relative; background-image: url('http://pub.diamondisland.online/img/div-img-add.png'); background-size: 100% 100%;; top: -7px; margin: 0px 5px; width: 135px; height: 110px; display: flex; align-items: center; justify-content: center;">       
                                        <p class="clickAddImg">{{ 'Click_to_add_images' | translate }}</p>
                                    </div>
                                </label>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1" style="height: 105px;display: inline-block;vertical-align: top;font-size: 38px;  padding: 0px; padding-top: 25px; color: #c3c3c3;text-align: right" ng-click="scroll_right()"> > </div>
                        </div>
                    </div>

                    <!-- tu?ng trung cho d?u c?ng -->



                </div>