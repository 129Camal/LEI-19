<template>
    <div class="card">
        <div class="header">
            <h4 class="title">Import <i>RAW</i> File</h4>
        </div>
        <div class="content">
            <form>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control border-input" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Test Date</label>
                            <input type="date" class="form-control border-input" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>More Information</label>
                                <textarea rows="5" class="form-control border-input" placeholder="Here can be description about the test"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>File</label>
                                <input type="file" class="border-input" placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-info btn-fill btn-wd">Import File</button>
                    </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
  name: 'fileimport'
}

</script>
